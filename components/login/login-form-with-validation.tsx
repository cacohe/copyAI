import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, AlertCircle } from "lucide-react"
import { useLanguage } from "@/components/common/language-provider"
import { useLogin } from "@/hooks/use-login"

/**
 * 登录表单组件（带验证和错误处理）
 */
export function LoginFormWithValidation() {
  const { t } = useLanguage()
  const {
    email,
    password,
    isLoading,
    error,
    setEmail,
    setPassword,
    handleSubmit,
  } = useLogin()

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
      {/* 全局错误提示 */}
      {error && <ErrorAlert message={error} />}

      <EmailInput
        value={email}
        onChange={setEmail}
        disabled={isLoading}
      />

      <PasswordInput
        value={password}
        onChange={setPassword}
        disabled={isLoading}
      />

      <SubmitButton isLoading={isLoading} />
    </form>
  )
}

interface ErrorAlertProps {
  message: string
}

function ErrorAlert({ message }: ErrorAlertProps) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
      <AlertCircle className="h-4 w-4 shrink-0" />
      <p>{message}</p>
    </div>
  )
}

interface EmailInputProps {
  value: string
  onChange: (value: string) => void
  disabled?: boolean
}

function EmailInput({ value, onChange, disabled }: EmailInputProps) {
  const { t } = useLanguage()

  return (
    <div className="space-y-2">
      <Label htmlFor="email">{t("login.email")}</Label>
      <Input
        id="email"
        type="email"
        placeholder="you@example.com"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        required
        className="h-11"
        autoComplete="email"
      />
    </div>
  )
}

interface PasswordInputProps {
  value: string
  onChange: (value: string) => void
  disabled?: boolean
}

function PasswordInput({ value, onChange, disabled }: PasswordInputProps) {
  const { t } = useLanguage()

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label htmlFor="password">{t("login.password")}</Label>
        <Link
          href="#"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          {t("login.forgotPassword")}
        </Link>
      </div>
      <Input
        id="password"
        type="password"
        placeholder="••••••••"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        required
        minLength={8}
        className="h-11"
        autoComplete="current-password"
      />
    </div>
  )
}

interface SubmitButtonProps {
  isLoading: boolean
}

function SubmitButton({ isLoading }: SubmitButtonProps) {
  const { t } = useLanguage()

  return (
    <Button type="submit" className="h-11 w-full" disabled={isLoading}>
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {t("login.loading")}
        </>
      ) : (
        t("login.submit")
      )}
    </Button>
  )
}
