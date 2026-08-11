import 'server-only'

import { ChatMessage } from '@/types/dashboard/llm'

// 调用 LLM
export async function callLLM(messages: ChatMessage[]) {
  const provider = process.env.AI_API_FORMAT || 'openai'
  const apiKey = process.env.AI_API_KEY
  const endpoint = process.env.AI_API_ENDPOINT
  const model = process.env.AI_MODEL_NAME

  if (!apiKey || !endpoint || !model) throw new Error('AI 配置缺失')

  let fetchUrl = endpoint
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }
  let body: Record<string, unknown>

  if (provider === 'gemini') {
    fetchUrl = `${endpoint}?key=${apiKey}`
    body = {
      contents: messages
        .filter((m) => m.role !== 'system')
        .map((m) => ({
          role: m.role === 'user' ? 'user' : 'model',
          parts: [{ text: m.content }],
        })),
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 2000,
      },
    }
  } else {
    headers.Authorization = `Bearer ${apiKey}`
    body = {
      model,
      messages,
      temperature: 0.7,
    }
  }

  const response = await fetch(fetchUrl, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    console.error(`LLM Provider Error (${provider}):`, errorData)
    throw new Error(`AI 服务异常: ${response.statusText}`)
  }

  const data = await response.json()

  try {
    if (provider === 'gemini') {
      return data.candidates[0].content.parts[0].text
    }
    return data.choices[0].message.content
  } catch {
    throw new Error('解析 AI 回复失败，请检查模型配置')
  }
}
