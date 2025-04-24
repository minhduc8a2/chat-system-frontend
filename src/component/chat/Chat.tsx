import { useMemo, useState } from "react"
import WebsocketProvider from "./WebsocketProvider"
import RoomManager from "./RoomManager"
import { ChatContext, ChatContextType } from "./context/chatContext"
import ChatInput from "./ChatInput"
import MessagePanel from "./MessagePanel"

export default function Chat() {
  const [activeRoomId, setActiveRoomId] = useState<number | null>(1)

  const chatContextValue = useMemo<ChatContextType>(
    () => ({ activeRoomId, setActiveRoomId }),
    [activeRoomId]
  )
  return (
    <WebsocketProvider>
      <ChatContext.Provider value={chatContextValue}>
        <div className="">
          <RoomManager />
          <MessagePanel />
          <ChatInput />
        </div>
      </ChatContext.Provider>
    </WebsocketProvider>
  )
}
