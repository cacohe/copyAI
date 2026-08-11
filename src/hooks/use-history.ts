import { useState, useEffect, useCallback } from "react"
import { HistoryItem, CreateHistoryItemInput } from "@/types/dashboard/history"
import {
  clearHistoryContent,
  deleteHistoryContent,
  getHistoryContent,
} from "@/app/actions/dashboard"

export function useHistory() {
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [selectedHistory, setSelectedHistory] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadHistory = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)
      const data = await getHistoryContent()

      const formattedHistory: HistoryItem[] = data.map((item) => ({
        id: item.id,
        platform: item.platform,
        topic: item.topic,
        content: item.content,
        createdAt: new Date(item.createdAt),
      }))

      setHistory(formattedHistory)
    } catch (err) {
      console.error("Failed to load history:", err)
      setError(err instanceof Error ? err.message : "Failed to load history")
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    loadHistory()
  }, [loadHistory])

  const addToHistory = async (input: CreateHistoryItemInput) => {
    const data = await getHistoryContent()

    const formattedHistory: HistoryItem[] = data.map((item) => ({
      id: item.id,
      platform: item.platform,
      topic: item.topic,
      content: item.content,
      createdAt: new Date(item.createdAt),
    }))

    setHistory(formattedHistory)

    const match = formattedHistory.find(
      (item) =>
        item.platform === input.platform &&
        item.topic === input.topic &&
        item.content === input.content
    )

    const selected = match ?? formattedHistory[0]
    if (selected) {
      setSelectedHistory(selected.id)
    }

    return selected ?? {
      id: Date.now().toString(),
      platform: input.platform,
      topic: input.topic,
      content: input.content,
      createdAt: new Date(),
    }
  }

  const clearSelection = () => {
    setSelectedHistory(null)
  }

  const selectHistory = (item: HistoryItem) => {
    setSelectedHistory(item.id)
  }

  const selectedHistoryItem =
    history.find((item) => item.id === selectedHistory) ?? null

  const deleteHistory = async (id: string) => {
    const previous = history
    setHistory((prev) => prev.filter((item) => item.id !== id))
    if (selectedHistory === id) {
      setSelectedHistory(null)
    }

    try {
      await deleteHistoryContent(id)
    } catch (err) {
      console.error("Failed to delete history:", err)
      setHistory(previous)
      throw err
    }
  }

  const clearHistory = async () => {
    const previous = history
    setHistory([])
    setSelectedHistory(null)

    try {
      await clearHistoryContent()
    } catch (err) {
      console.error("Failed to clear history:", err)
      setHistory(previous)
      throw err
    }
  }

  return {
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
    reloadHistory: loadHistory,
  }
}
