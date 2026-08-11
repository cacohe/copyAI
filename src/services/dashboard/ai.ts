import 'server-only'

import { ChatMessage } from '@/types/dashboard/llm'
import { callLLM } from '@/lib/llm-client'

export async function generateAIContent(
  platform: string,
  theme: string,
  keywords: string
): Promise<string> {
  const systemPrompt = `你是一个${platform}平台的爆款文案专家，擅长捕捉用户情绪和平台流量密码。`
  const userPrompt = `主题：${theme}\n关键词：${keywords}\n请为我生成一段具有吸引力的文案。`

  const messages: ChatMessage[] = [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: userPrompt },
  ]

  try {
    return await callLLM(messages)
  } catch (error) {
    console.error('AI generation error:', error)
    return '抱歉，生成文案时出错，请稍后再试。'
  }
}
