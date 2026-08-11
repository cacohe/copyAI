import { useState } from "react"
import { useLanguage } from "@/components/common/language-provider"
import { generateContent } from "@/lib/content-generator"

export function useContentGenerator() {
  const { t } = useLanguage()
  const [platform, setPlatform] = useState("")
  const [topic, setTopic] = useState("")
  const [keywords, setKeywords] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedContent, setGeneratedContent] = useState("")

  const getPlatformLabel = (value: string) => {
    const platformKey = `platform.${value}` as const
    return t(platformKey)
  }

  const handleGenerate = async () => {
    if (!platform || !topic) return null

    setIsGenerating(true)
    setGeneratedContent("")

    try {
      const platformLabel = getPlatformLabel(platform)
      const content = await generateContent({
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