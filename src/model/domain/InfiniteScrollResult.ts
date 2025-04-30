import { MessageDTO } from "./MessageDTO"

export interface InfiniteScrollResult {
  hasMore: boolean
  messages: MessageDTO[]
}
