import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { generateContent } from '@/lib/content-generator'

describe('generateContent', () => {
  const fetchMock = vi.fn()

  beforeEach(() => {
    vi.stubGlobal('fetch', fetchMock)
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    vi.clearAllMocks()
  })

  it('returns generated content from API', async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({ content: '生成结果' }),
    })

    const result = await generateContent({
      platform: '小红书',
      topic: '春季护肤',
      keywords: '保湿',
    })

    expect(result).toBe('生成结果')
    expect(fetchMock).toHaveBeenCalledWith(
      '/api/generate',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({
          platform: '小红书',
          topic: '春季护肤',
          keywords: '保湿',
        }),
      })
    )
  })

  it('throws when API returns error', async () => {
    fetchMock.mockResolvedValue({
      ok: false,
      json: async () => ({ error: '输入包含违规词' }),
    })

    await expect(
      generateContent({ platform: '微博', topic: '测试' })
    ).rejects.toThrow('输入包含违规词')
  })
})
