import type { TranslationKey } from '@/messages'

export const PLATFORM_VALUES = [
  'general',
  'xiaohongshu',
  'wechat',
  'douyin',
  'weibo',
] as const

export type PlatformValue = typeof PLATFORM_VALUES[number]

export const PLATFORMS: ReadonlyArray<{ value: PlatformValue }> =
  PLATFORM_VALUES.map((value) => ({ value }))

const platformTranslationKeys: Record<PlatformValue, TranslationKey> = {
  general: 'platform.general',
  xiaohongshu: 'platform.xiaohongshu',
  wechat: 'platform.wechat',
  douyin: 'platform.douyin',
  weibo: 'platform.weibo',
}

export function toPlatformTranslationKey(value: PlatformValue): TranslationKey {
  return platformTranslationKeys[value]
}
