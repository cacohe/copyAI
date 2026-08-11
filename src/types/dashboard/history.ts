export interface HistoryItem {
  id: string
  platform: string
  topic: string
  content: string
  createdAt: Date
}

export interface CreateHistoryItemInput {
  platform: string
  topic: string
  content: string
}