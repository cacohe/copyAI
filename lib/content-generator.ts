interface GenerateContentOptions {
  platform: string
  topic: string
  keywords?: string
}

export async function generateContent({
  platform,
  topic,
  keywords,
}: GenerateContentOptions): Promise<string> {
  const response = await fetch('/api/generate', {
    method: 'POST',
    body: JSON.stringify({ platform, topic, keywords }),
    headers: { 'Content-Type': 'application/json' },
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || '生成失败')
  }

  return data.content
}
