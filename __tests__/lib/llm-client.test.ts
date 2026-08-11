import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { callLLM } from '@/lib/llm-client'

describe('callLLM', () => {
  const fetchMock = vi.fn()

  beforeEach(() => {
    vi.stubGlobal('fetch', fetchMock)
    vi.stubEnv('AI_API_KEY', 'test-api-key')
    vi.stubEnv('AI_API_ENDPOINT', 'https://api.example.com/v1/chat/completions')
    vi.stubEnv('AI_MODEL_NAME', 'test-model')
    vi.stubEnv('AI_API_FORMAT', 'openai')
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    vi.unstubAllEnvs()
    vi.clearAllMocks()
  })

  it('throws when AI configuration is missing', async () => {
    vi.stubEnv('AI_API_KEY', '')

    await expect(
      callLLM([{ role: 'user', content: 'hello' }])
    ).rejects.toThrow('AI 配置缺失')
  })

  it('parses OpenAI-compatible response', async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({
        choices: [{ message: { content: '生成的文案' } }],
      }),
    })

    const result = await callLLM([
      { role: 'system', content: 'system' },
      { role: 'user', content: '写文案' },
    ])

    expect(result).toBe('生成的文案')
    expect(fetchMock).toHaveBeenCalledWith(
      'https://api.example.com/v1/chat/completions',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          Authorization: 'Bearer test-api-key',
        }),
      })
    )
  })

  it('throws when OpenAI provider returns error status', async () => {
    fetchMock.mockResolvedValue({
      ok: false,
      statusText: 'Bad Request',
      json: async () => ({ error: 'invalid' }),
    })

    await expect(
      callLLM([{ role: 'user', content: 'hello' }])
    ).rejects.toThrow('AI 服务异常: Bad Request')
  })

  it('parses Gemini response', async () => {
    vi.stubEnv('AI_API_FORMAT', 'gemini')
    vi.stubEnv('AI_API_ENDPOINT', 'https://generativelanguage.googleapis.com/v1/models/gemini')

    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({
        candidates: [{ content: { parts: [{ text: 'Gemini 文案' }] } }],
      }),
    })

    const result = await callLLM([
      { role: 'system', content: 'ignored for gemini' },
      { role: 'user', content: '写文案' },
    ])

    expect(result).toBe('Gemini 文案')
    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining('key=test-api-key'),
      expect.objectContaining({ method: 'POST' })
    )
  })

  it('throws when response shape is invalid', async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({ choices: [] }),
    })

    await expect(
      callLLM([{ role: 'user', content: 'hello' }])
    ).rejects.toThrow('解析 AI 回复失败')
  })
})
