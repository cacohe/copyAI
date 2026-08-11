import { useState } from "react"
import { useLanguage } from "@/components/common/language-provider"
import { generateDashboardContent } from "@/app/actions/dashboard"
import type { PlatformValue } from '@/lib/constants/platforms'
import { toPlatformTranslationKey } from '@/lib/constants/platforms'

export function useContentGenerator() {
  const { t } = useLanguage()
  const [platform, setPlatform] = useState("")
  const [topic, setTopic] = useState("")
  const [keywords, setKeywords] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedContent, setGeneratedContent] = useState("")

  const getPlatformLabel = (value: PlatformValue) => t(toPlatformTranslationKey(value))

  const handleGenerate = async () => {
    if (!platform || !topic) return null

    setIsGenerating(true)
    setGeneratedContent("")

    try {
      const platformLabel = getPlatformLabel(platform as PlatformValue)
      const content = await generateDashboardContent({
        platform: platformLabel,
        topic,
        keywords,
      })

      setGeneratedContent(content)
      return content
    } catch (error) {
      console.error("Generation failed:", error)
      return null
    } finally {
      setIsGenerating(false)
    }
  }

  return {
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
  }
}
