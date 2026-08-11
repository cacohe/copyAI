import { beforeEach, describe, expect, it, vi } from 'vitest'

const mocks = vi.hoisted(() => ({
  requireAuthUserId: vi.fn(),
  generateAIContent: vi.fn(),
  createGeneratedContent: vi.fn(),
}))

vi.mock('@/lib/auth/session', () => ({
  requireAuthUserId: mocks.requireAuthUserId,
}))

vi.mock('@/services/dashboard/ai', () => ({
  generateAIContent: mocks.generateAIContent,
}))

vi.mock('@/services/dashboard/contents', () => ({
  createGeneratedContent: mocks.createGeneratedContent,
}))

import { generateDashboardContent } from '@/app/actions/dashboard'

describe('generateDashboardContent', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mocks.requireAuthUserId.mockResolvedValue('user-1')
    mocks.generateAIContent.mockResolvedValue('生成结果')
    mocks.createGeneratedContent.mockResolvedValue(undefined)
  })

  it('generates and persists content for authenticated users', async () => {
    const result = await generateDashboardContent({
      platform: '小红书',
      topic: '春季护肤',
      keywords: '保湿',
    })

    expect(result).toBe('生成结果')
    expect(mocks.generateAIContent).toHaveBeenCalledWith('小红书', '春季护肤', '保湿')
    expect(mocks.createGeneratedContent).toHaveBeenCalledWith({
      userId: 'user-1',
      platform: '小红书',
      topic: '春季护肤',
      keywords: '保湿',
      content: '生成结果',
    })
  })
})
