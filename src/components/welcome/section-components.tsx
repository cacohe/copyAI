import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface SectionProps {
  children: ReactNode
  className?: string
  id?: string
}

/**
 * 通用Section容器
 */
export function Section({ children, className, id }: SectionProps) {
  return (
    <section id={id} className={cn("py-24 md:py-32", className)}>
      {children}
    </section>
  )
}

interface SectionContainerProps {
  children: ReactNode
  className?: string
}

/**
 * Section内容容器
 */
export function SectionContainer({ children, className }: SectionContainerProps) {
  return (
    <div className={cn("mx-auto max-w-7xl px-6", className)}>
      {children}
    </div>
  )
}

interface SectionHeaderProps {
  title: string
  description?: string
  className?: string
}

/**
 * Section标题组件
 */
export function SectionHeader({ title, description, className }: SectionHeaderProps) {
  return (
    <div className={cn("mx-auto max-w-2xl text-center", className)}>
      <h2 className="text-balance text-3xl font-bold tracking-tight md:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-muted-foreground">{description}</p>
      )}
    </div>
  )
}
