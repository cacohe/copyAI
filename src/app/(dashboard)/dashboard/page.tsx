"use client"

import { GeneratorPanel } from "@/components/dashboard/generator-panel"
import { ContentPanel } from "@/components/dashboard/content-panel"
import { useContentGenerator } from "@/hooks/use-content-generator"
import { HistoryPanel } from "@/components/dashboard/history-panel"
import { useHistory } from "@/hooks/use-history"
import { HistoryItem } from "@/types/dashboard/history"

// Dashboard 页面
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
    handleGenerate,
  } = useContentGenerator()

  const {
    history,
    selectedHistory,
    addToHistory,
    selectHistory,
    deleteHistory,
  } = useHistory()

  const handleGenerateWithHistory = async () => {
    const content = await handleGenerate()
    if (content) {
      await addToHistory({
        platform,
        topic,
        content,
      })
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
        content={generatedContent}
        isGenerating={isGenerating}
        platform={platform}
        topic={topic}
        onRegenerate={handleGenerateWithHistory}
      />

      <HistoryPanel
        history={history}
        selectedHistory={selectedHistory}
        onSelectHistory={(item: HistoryItem) => selectHistory(item)}
        onDeleteHistory={deleteHistory}
      />
    </div>
  )
}
