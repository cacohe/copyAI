import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
  checkContentSafe,
  validateContent,
} from '@/services/dashboard/moderation'

describe('moderation', () => {
  const fetchMock = vi.fn()

  beforeEach(() => {
    vi.stubGlobal('fetch', fetchMock)
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    vi.clearAllMocks()
  })

  describe('checkContentSafe', () => {
    it('returns true for safe content', async () => {
      await expect(checkContentSafe('正常营销文案')).resolves.toBe(true)
    })

    it('returns false when forbidden words are present', async () => {
      await expect(checkContentSafe('包含翻墙教程的内容')).resolves.toBe(false)
    })
  })

  describe('validateContent', () => {
    it('blocks locally forbidden words', async () => {
      const result = await validateContent('这里有翻墙教程')

      expect(result).toEqual({
        isAllowed: false,
        reason: 'sensitive_content',
      })
      expect(fetchMock).not.toHaveBeenCalled()
    })

    it('allows safe content when remote moderation passes', async () => {
      fetchMock.mockResolvedValue({
        ok: true,
        json: async () => ({ results: [{ flagged: false }] }),
      })

      const result = await validateContent('优质产品推广文案')

      expect(result).toEqual({ isAllowed: true })
      expect(fetchMock).toHaveBeenCalledOnce()
    })

    it('blocks content flagged by remote moderation', async () => {
      fetchMock.mockResolvedValue({
        ok: true,
        json: async () => ({ results: [{ flagged: true }] }),
      })

      const result = await validateContent('边缘内容')

      expect(result).toEqual({
        isAllowed: false,
        reason: 'sensitive_content',
      })
    })

    it('allows content when remote moderation fails', async () => {
      fetchMock.mockRejectedValue(new Error('network error'))

      const result = await validateContent('优质产品推广文案')

      expect(result).toEqual({ isAllowed: true })
    })
  })
})
