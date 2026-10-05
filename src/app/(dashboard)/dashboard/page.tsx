"use client"

import { GeneratorPanel } from "@/components/dashboard/generator-panel"
import { ContentPanel } from "@/components/dashboard/content-panel"
import { useContentGenerator } from "@/hooks/use-content-generator"
import { HistoryPanel } from "@/components/dashboard/history-panel"
import { useHistory } from "@/hooks/use-history"
import { HistoryItem } from "@/types/dashboard/history"
import type { PlatformValue } from "@/lib/constants/platforms"

export default function DashboardPage() {
  const {
    platform,
    topic,
    keywords,
    generatedContent,
    isGenerating,
    setPlatform,
    setTopic,
    setKeywords,
    setGeneratedContent,
    handleGenerate,
    getPlatformLabel,
  } = useContentGenerator()

  const {
    history,
    selectedHistory,
    selectedHistoryItem,
    isLoading,
    error,
    addToHistory,
    selectHistory,
    clearSelection,
    deleteHistory,
    clearHistory,
    reloadHistory,
  } = useHistory()

  const displayContent = selectedHistoryItem?.content ?? generatedContent
  const displayTopic = selectedHistoryItem?.topic ?? topic
  const displayPlatform = selectedHistoryItem?.platform

  const handleSelectHistory = (item: HistoryItem) => {
    selectHistory(item)
    setGeneratedContent(item.content)
  }

  const handleDeleteHistory = async (id: string) => {
    const wasSelected = selectedHistory === id
    try {
      await deleteHistory(id)
      if (wasSelected) {
        setGeneratedContent("")
      }
    } catch {
      // deleteHistory restores state on failure
    }
  }

  const handleGenerateWithHistory = async () => {
    clearSelection()
    const content = await handleGenerate()
    if (content) {
      await addToHistory({
        platform: platform ? getPlatformLabel(platform as PlatformValue) : "",
        topic,
        content,
      })
    }
  }

  const handleClearHistory = async () => {
    try {
      await clearHistory()
      setGeneratedContent("")
    } catch {
      // clearHistory restores state on failure
    }
  }

  return (
    <div className="flex flex-1 overflow-hidden">
      <GeneratorPanel
        platform={platform}
        topic={topic}
        keywords={keywords}
        isGenerating={isGenerating}
        onPlatformChange={setPlatform}
        onTopicChange={setTopic}
        onKeywordsChange={setKeywords}
        onGenerate={handleGenerateWithHistory}
      />

      <ContentPanel
        content={displayContent}
        isGenerating={isGenerating}
        platform={platform}
        topic={displayTopic}
        platformLabel={displayPlatform}
        onRegenerate={handleGenerateWithHistory}
      />

      <HistoryPanel
        history={history}
        selectedHistory={selectedHistory}
        isLoading={isLoading}
        error={error}
        onSelectHistory={handleSelectHistory}
        onDeleteHistory={handleDeleteHistory}
        onClearHistory={handleClearHistory}
        onRetry={reloadHistory}
      />
    </div>
  )
}
