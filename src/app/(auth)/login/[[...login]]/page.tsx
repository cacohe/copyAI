import { SignIn } from '@clerk/nextjs'
import { clerkAppearance } from '@/lib/auth/clerk-appearance'

export default function LoginPage() {
  return (
    <SignIn
      appearance={clerkAppearance}
      routing="path"
      path="/login"
      signUpUrl="/register"
      forceRedirectUrl="/dashboard"
      fallbackRedirectUrl="/dashboard"
      signUpForceRedirectUrl="/dashboard"
    />
  )
}
