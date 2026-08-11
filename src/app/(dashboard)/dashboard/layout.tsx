import { DashboardHeader } from "@/components/dashboard/dashboard-header"

// Dashboard 页面根布局
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen flex-col bg-background">
      <DashboardHeader />
      {children}
    </div>
  )
}
