/**
 * Clerk 认证页面外观配置
 */
export const clerkAppearance = {
  elements: {
    rootBox: 'mx-auto w-full',
    cardBox: 'shadow-none',
    card: 'shadow-none border border-border bg-card',
    headerTitle: 'text-foreground',
    headerSubtitle: 'text-muted-foreground',
    socialButtonsBlockButton: 'border-border',
    formButtonPrimary:
      'bg-primary text-primary-foreground hover:bg-primary/90',
    footerActionLink: 'text-accent hover:text-accent',
  },
} as const
