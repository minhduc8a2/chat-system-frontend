import { useMemo, useState } from "react"
import WebsocketProvider from "./WebsocketProvider"
import RoomManager from "./RoomManager/RoomManager"
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
        <div className="grid grid-cols-6 mt-24 px-6 ">
          <div className="col-span-1">
            <RoomManager />
          </div>
          <div className="col-span-5">
            <MessagePanel />
            <ChatInput />
          </div>
        </div>
      </ChatContext.Provider>
    </WebsocketProvider>
  )
}
