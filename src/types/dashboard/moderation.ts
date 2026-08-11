export interface UsageCheck {
  isAllowed: boolean
  reason?: 'sensitive_content'
}
