import { SignUp } from '@clerk/nextjs'
import { clerkAppearance } from '@/lib/auth/clerk-appearance'

export default function RegisterPage() {
  return (
    <SignUp
      appearance={clerkAppearance}
      routing="path"
      path="/register"
      signInUrl="/login"
      forceRedirectUrl="/dashboard"
    />
  )
}
