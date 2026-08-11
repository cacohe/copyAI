'use server'

import { requireAuthUserId } from '@/lib/auth/session'
import { checkContentSafe } from '@/services/dashboard/moderation'
import { generateAIContent } from '@/services/dashboard/ai'
import { createGeneratedContent } from '@/services/dashboard/contents'
import {
  clearUserHistory,
  deleteHistoryItem,
  getUserHistory,
} from '@/services/dashboard/history'
import type { HistoryItem } from '@/types/dashboard/history'

// 按照输入要求，生成文案
export async function generateDashboardContent(input: {
  platform: string
  topic: string
  keywords?: string
}): Promise<string> {
  const userId = await requireAuthUserId()
  const { platform, topic, keywords = '' } = input

  const isSafe = await checkContentSafe(`${topic} ${keywords}`)
  if (!isSafe) {
    throw new Error('输入包含违规词')
  }

  const content = await generateAIContent(platform, topic, keywords)

  await createGeneratedContent({
    userId,
    platform,
    topic,
    keywords,
    content,
  })

  return content
}

// 获取历史记录
export async function getHistoryContent(): Promise<HistoryItem[]> {
  const userId = await requireAuthUserId()
  return getUserHistory(userId)
}

export async function deleteHistoryContent(id: string): Promise<void> {
  const userId = await requireAuthUserId()
  const result = await deleteHistoryItem(userId, id)

  if (result.count === 0) {
    throw new Error('记录不存在或无权删除')
  }
}

export async function clearHistoryContent(): Promise<void> {
  const userId = await requireAuthUserId()
  await clearUserHistory(userId)
}
