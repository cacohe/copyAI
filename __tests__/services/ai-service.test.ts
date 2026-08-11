import { afterEach, describe, expect, it, vi } from 'vitest'
import { generateAIContent } from '@/services/dashboard/ai-service'
import { callLLM } from '@/lib/llm-client'

vi.mock('@/lib/llm-client', () => ({
  callLLM: vi.fn(),
}))

const callLLMMock = vi.mocked(callLLM)

describe('generateAIContent', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('builds prompt and returns LLM content', async () => {
    callLLMMock.mockResolvedValue('爆款文案内容')

    const result = await generateAIContent('小红书', '春季护肤', '保湿, 防晒')

    expect(result).toBe('爆款文案内容')
    expect(callLLMMock).toHaveBeenCalledWith([
      {
        role: 'system',
        content: '你是一个小红书平台的爆款文案专家，擅长捕捉用户情绪和平台流量密码。',
      },
      {
        role: 'user',
        content: '主题：春季护肤\n关键词：保湿, 防晒\n请为我生成一段具有吸引力的文案。',
      },
    ])
  })

  it('returns fallback message when LLM call fails', async () => {
    callLLMMock.mockRejectedValue(new Error('provider down'))

    const result = await generateAIContent('微博', '新品发布', '限时优惠')

    expect(result).toBe('抱歉，生成文案时出错，请稍后再试。')
  })
})
