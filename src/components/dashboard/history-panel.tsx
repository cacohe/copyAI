import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Clock, Loader2, Trash2 } from "lucide-react"
import { useLanguage } from "@/components/common/language-provider"
import { HistoryItem } from "@/types/dashboard/history"
import { formatTimeAgo } from "@/lib/utils/time"

interface HistoryPanelProps {
  history: HistoryItem[]
  selectedHistory: string | null
  isLoading: boolean
  error: string | null
  onSelectHistory: (item: HistoryItem) => void
  onDeleteHistory: (id: string) => void
  onClearHistory: () => void
  onRetry: () => void
}

export function HistoryPanel({
  history,
  selectedHistory,
  isLoading,
  error,
  onSelectHistory,
  onDeleteHistory,
  onClearHistory,
  onRetry,
}: HistoryPanelProps) {
  const { t } = useLanguage()

  const handleClear = () => {
    if (history.length === 0) return
    if (window.confirm(t("dashboard.clearHistoryConfirm"))) {
      onClearHistory()
    }
  }

  return (
    <aside className="flex h-full min-h-0 w-80 shrink-0 flex-col border-l border-border bg-card">
      <HistoryHeader
        historyCount={history.length}
        canClear={!isLoading && history.length > 0}
        onClear={handleClear}
      />
      <div className="min-h-0 flex-1 overflow-hidden">
        {error ? (
          <HistoryError onRetry={onRetry} />
        ) : isLoading && history.length === 0 ? (
          <HistoryLoading />
        ) : (
          <ScrollArea className="h-full">
            {history.length > 0 ? (
              <HistoryList
                history={history}
                selectedHistory={selectedHistory}
                onSelectHistory={onSelectHistory}
                onDeleteHistory={onDeleteHistory}
              />
            ) : (
              <EmptyHistory />
            )}
          </ScrollArea>
        )}
      </div>
    </aside>
  )
}

function HistoryHeader({
  historyCount,
  canClear,
  onClear,
}: {
  historyCount: number
  canClear: boolean
  onClear: () => void
}) {
  const { t } = useLanguage()

  return (
    <div className="flex items-center justify-between gap-2 border-b border-border p-4">
      <div>
        <h2 className="font-semibold">{t("dashboard.history")}</h2>
        <p className="text-xs text-muted-foreground">
          {historyCount} {t("dashboard.historyCount")}
        </p>
      </div>
      <Button
        variant="ghost"
        size="sm"
        className="h-8 shrink-0 text-muted-foreground hover:text-destructive"
        disabled={!canClear}
        onClick={onClear}
      >
        <Trash2 className="h-4 w-4" />
        {t("dashboard.clearHistory")}
      </Button>
    </div>
  )
}

function HistoryLoading() {
  const { t } = useLanguage()

  return (
    <div className="flex h-40 flex-col items-center justify-center text-center">
      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      <p className="mt-2 text-sm text-muted-foreground">
        {t("dashboard.historyLoading")}
      </p>
    </div>
  )
}

function HistoryError({ onRetry }: { onRetry: () => void }) {
  const { t } = useLanguage()

  return (
    <div className="flex h-40 flex-col items-center justify-center gap-3 px-6 text-center">
      <p className="text-sm text-destructive">{t("dashboard.historyError")}</p>
      <Button variant="outline" size="sm" onClick={onRetry}>
        {t("dashboard.retry")}
      </Button>
    </div>
  )
}

interface HistoryListProps {
  history: HistoryItem[]
  selectedHistory: string | null
  onSelectHistory: (item: HistoryItem) => void
  onDeleteHistory: (id: string) => void
}

function HistoryList({
  history,
  selectedHistory,
  onSelectHistory,
  onDeleteHistory,
}: HistoryListProps) {
  return (
    <div className="divide-y divide-border">
      {history.map((item) => (
        <HistoryItemCard
          key={item.id}
          item={item}
          isSelected={selectedHistory === item.id}
          onSelect={() => onSelectHistory(item)}
          onDelete={() => onDeleteHistory(item.id)}
        />
      ))}
    </div>
  )
}

interface HistoryItemCardProps {
  item: HistoryItem
  isSelected: boolean
  onSelect: () => void
  onDelete: () => void
}

function HistoryItemCard({
  item,
  isSelected,
  onSelect,
  onDelete,
}: HistoryItemCardProps) {
  const { t } = useLanguage()

  return (
    <div
      role="button"
      tabIndex={0}
      className={`group cursor-pointer p-4 transition-colors hover:bg-secondary ${
        isSelected ? "bg-secondary ring-1 ring-inset ring-accent/40" : ""
      }`}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          onSelect()
        }
      }}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="rounded bg-accent/20 px-2 py-0.5 text-xs text-accent">
              {item.platform}
            </span>
            <span className="text-xs text-muted-foreground">
              {formatTimeAgo(item.createdAt, t)}
            </span>
          </div>
          <h4 className="mt-2 truncate font-medium text-sm">{item.topic}</h4>
          <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
            {item.content}
          </p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
          onClick={(e) => {
            e.stopPropagation()
            onDelete()
          }}
        >
          <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
        </Button>
      </div>
    </div>
  )
}

function EmptyHistory() {
  const { t } = useLanguage()

  return (
    <div className="flex h-40 flex-col items-center justify-center text-center">
      <Clock className="h-8 w-8 text-muted-foreground" />
      <p className="mt-2 text-sm text-muted-foreground">
        {t("dashboard.noHistory")}
      </p>
    </div>
  )
}
