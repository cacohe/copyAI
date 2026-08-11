import { describe, expect, it } from 'vitest'
import { cn } from '@/lib/utils'
import { formatTimeAgo } from '@/lib/utils/time'
import { PLATFORMS } from '@/lib/constants'

describe('cn', () => {
  it('merges class names', () => {
    expect(cn('px-2', 'py-2', false && 'hidden', 'px-4')).toBe('py-2 px-4')
  })
})

describe('formatTimeAgo', () => {
  const t = (key: string) => key

  it('formats minutes ago', () => {
    const date = new Date(Date.now() - 30 * 60 * 1000)
    expect(formatTimeAgo(date, t)).toBe('30 dashboard.minutesAgo')
  })

  it('formats hours ago', () => {
    const date = new Date(Date.now() - 3 * 60 * 60 * 1000)
    expect(formatTimeAgo(date, t)).toBe('3 dashboard.hoursAgo')
  })

  it('formats days ago', () => {
    const date = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
    expect(formatTimeAgo(date, t)).toBe('2 dashboard.daysAgo')
  })
})

describe('PLATFORMS', () => {
  it('contains expected platform options', () => {
    expect(PLATFORMS.map((p) => p.value)).toEqual([
      'general',
      'xiaohongshu',
      'wechat',
      'douyin',
      'weibo',
    ])
  })
})
