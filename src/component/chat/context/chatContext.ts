import { createContext, useContext } from "react"
import { Room } from "../../../model/domain/Room"

export interface ChatContextType {
  activeRoom: Room | null
  setActiveRoom: React.Dispatch<React.SetStateAction<Room | null>>
}
export const ChatContext = createContext<ChatContextType>({
  activeRoom: null,
  setActiveRoom: () => {},
})

export const useChatRoomContext = () => {
  const context = useContext(ChatContext)

  return context
}
