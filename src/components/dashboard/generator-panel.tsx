import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Sparkles, Loader2 } from "lucide-react"
import { useLanguage } from "@/components/common/language-provider"
import {
  PLATFORMS,
  type PlatformValue,
  toPlatformTranslationKey,
} from '@/lib/constants/platforms'

interface GeneratorPanelProps {
  platform: string
  topic: string
  keywords: string
  isGenerating: boolean
  onPlatformChange: (value: string) => void
  onTopicChange: (value: string) => void
  onKeywordsChange: (value: string) => void
  onGenerate: () => void
}

// 文案生成器面板
export function GeneratorPanel({
  platform,
  topic,
  keywords,
  isGenerating,
  onPlatformChange,
  onTopicChange,
  onKeywordsChange,
  onGenerate,
}: GeneratorPanelProps) {
  const { t } = useLanguage()

  const getPlatformLabel = (value: PlatformValue) =>
    t(toPlatformTranslationKey(value))

  const canGenerate = platform && topic && !isGenerating

  return (
    <aside className="flex w-80 shrink-0 flex-col border-r border-border bg-card p-6">
      <h2 className="text-lg font-semibold">{t("dashboard.settings")}</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        {t("dashboard.settingsDesc")}
      </p>

      <div className="mt-6 flex flex-1 flex-col gap-5">
        <div className="space-y-2">
          <Label htmlFor="platform">{t("dashboard.platform")}</Label>
          <Select value={platform} onValueChange={onPlatformChange}>
            <SelectTrigger id="platform" className="h-10">
              <SelectValue placeholder={t("dashboard.platformPlaceholder")} />
            </SelectTrigger>
            <SelectContent>
              {PLATFORMS.map((p) => (
                <SelectItem key={p.value} value={p.value}>
                  {getPlatformLabel(p.value)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="topic">{t("dashboard.topic")}</Label>
          <Input
            id="topic"
            placeholder={t("dashboard.topicPlaceholder")}
            value={topic}
            onChange={(e) => onTopicChange(e.target.value)}
            className="h-10"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="keywords">{t("dashboard.keywords")}</Label>
          <Textarea
            id="keywords"
            placeholder={t("dashboard.keywordsPlaceholder")}
            value={keywords}
            onChange={(e) => onKeywordsChange(e.target.value)}
            rows={3}
            className="resize-none"
          />
        </div>

        <div className="mt-auto">
          <Button
            onClick={onGenerate}
            disabled={!canGenerate}
            className="h-11 w-full"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t("dashboard.generating")}
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                {t("dashboard.generate")}
              </>
            )}
          </Button>
        </div>
      </div>
    </aside>
  )
}