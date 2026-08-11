import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Copy, Check, RefreshCw, Sparkles } from "lucide-react"
import { useLanguage } from "@/components/common/language-provider"
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard"

interface ContentPanelProps {
  content: string
  isGenerating: boolean
  platform: string
  topic: string
  onRegenerate: () => void
}

// 文案内容面板
export function ContentPanel({
  content,
  isGenerating,
  platform,
  topic,
  onRegenerate,
}: ContentPanelProps) {
  const { t } = useLanguage()
  const { copied, copyToClipboard } = useCopyToClipboard()

  const canRegenerate = !isGenerating && platform && topic

  return (
    <main className="flex flex-1 flex-col overflow-hidden p-6">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">{t("dashboard.result")}</h2>
          <p className="text-sm text-muted-foreground">
            {t("dashboard.resultDesc")}
          </p>
        </div>
        {content && (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onRegenerate}
              disabled={!canRegenerate}
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              {t("dashboard.regenerate")}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(content)}
            >
              {copied ? (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  {t("dashboard.copied")}
                </>
              ) : (
                <>
                  <Copy className="mr-2 h-4 w-4" />
                  {t("dashboard.copy")}
                </>
              )}
            </Button>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-hidden rounded-lg border border-border bg-card">
        {content ? (
          <ScrollArea className="h-full p-6">
            <div className="whitespace-pre-wrap text-sm leading-relaxed">
              {content}
              {isGenerating && (
                <span className="ml-1 inline-block h-4 w-2 animate-pulse bg-accent" />
              )}
            </div>
          </ScrollArea>
        ) : (
          <EmptyState />
        )}
      </div>
    </main>
  )
}

// 空状态
function EmptyState() {
  const { t } = useLanguage()

  return (
    <div className="flex h-full flex-col items-center justify-center text-center">
      <div className="rounded-full bg-secondary p-4">
        <Sparkles className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="mt-4 font-medium">{t("dashboard.noContent")}</h3>
      <p className="mt-1 max-w-xs text-sm text-muted-foreground">
        {t("dashboard.noContentDesc")}
      </p>
    </div>
  )
}