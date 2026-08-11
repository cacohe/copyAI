import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { get, HttpError, post } from '@/lib/http-utils'

describe('http-utils', () => {
  const fetchMock = vi.fn()

  beforeEach(() => {
    vi.stubGlobal('fetch', fetchMock)
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    vi.clearAllMocks()
  })

  it('performs GET requests with query params', async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      headers: { get: () => 'application/json' },
      json: async () => ({ ok: true }),
    })

    const result = await get<{ ok: boolean }>('/api/history', {
      page: 1,
      q: 'test',
    })

    expect(result).toEqual({ ok: true })
    expect(fetchMock).toHaveBeenCalledWith(
      '/api/history?page=1&q=test',
      expect.objectContaining({ method: 'GET' })
    )
  })

  it('performs POST requests with JSON body', async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      headers: { get: () => 'application/json' },
      json: async () => ({ content: '文案' }),
    })

    const result = await post<{ content: string }>('/api/generate', {
      topic: '测试',
    })

    expect(result).toEqual({ content: '文案' })
    expect(fetchMock).toHaveBeenCalledWith(
      '/api/generate',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ topic: '测试' }),
      })
    )
  })

  it('throws HttpError for non-OK responses', async () => {
    fetchMock.mockResolvedValue({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
      headers: { get: () => 'application/json' },
      json: async () => ({}),
    })

    await expect(get('/api/fail')).rejects.toBeInstanceOf(HttpError)
  })

  it('wraps network failures', async () => {
    fetchMock.mockRejectedValue(new Error('offline'))

    await expect(get('/api/fail')).rejects.toThrow('Network error: offline')
  })
})
