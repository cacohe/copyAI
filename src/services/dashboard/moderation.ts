import 'server-only'

import type { UsageCheck } from '@/types/dashboard/moderation'

const FORBIDDEN_WORDS = ['翻墙', '代考', '枪支', '色情']

export async function checkContentSafe(text: string): Promise<boolean> {
  const result = await validateContent(text)
  return result.isAllowed
}

export async function validateContent(text: string): Promise<UsageCheck> {
  const hasLocalMatch = FORBIDDEN_WORDS.some((word) => text.includes(word))

  if (hasLocalMatch) {
    return { isAllowed: false, reason: 'sensitive_content' }
  }

  try {
    const response = await fetch('https://api.openai.com/v1/moderations', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.AI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ input: text }),
    })

    const data = await response.json()
    const [result] = data.results

    if (result?.flagged) {
      return { isAllowed: false, reason: 'sensitive_content' }
    }
  } catch (error) {
    console.error('Moderation API Error:', error)
  }

  return { isAllowed: true }
}
