import 'server-only'

import { prisma } from '@/lib/prisma'
import type { HistoryItem } from '@/types/dashboard/history'

function toHistoryItem(record: {
  id: bigint
  platform: string
  topic: string
  content: string
  createdAt: Date
}): HistoryItem {
  return {
    id: record.id.toString(),
    platform: record.platform,
    topic: record.topic,
    content: record.content,
    createdAt: record.createdAt,
  }
}

export async function getUserHistory(userId: string): Promise<HistoryItem[]> {
  const records = await prisma.generatedContent.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      platform: true,
      topic: true,
      content: true,
      createdAt: true,
    },
  })

  return records.map(toHistoryItem)
}

export async function deleteHistoryItem(userId: string, id: string) {
  const contentId = BigInt(id)

  return prisma.generatedContent.deleteMany({
    where: {
      id: contentId,
      userId,
    },
  })
}

export async function clearUserHistory(userId: string) {
  return prisma.generatedContent.deleteMany({
    where: { userId },
  })
}
