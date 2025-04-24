import { createContext } from "react"

export interface ChatContextType {
  activeRoomId: number | null
  setActiveRoomId:React.Dispatch<React.SetStateAction<number | null>>
}
export const ChatContext = createContext<ChatContextType>({
  activeRoomId: null,
  setActiveRoomId:()=>{}
})