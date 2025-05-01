import { useMemo, useState } from "react"
import WebsocketProvider from "./WebsocketProvider"
import RoomManager from "./RoomManager/RoomManager"
import { ChatContext, ChatContextType } from "./context/chatContext"
import ChatInput from "./ChatInput"
import MessagePanel from "./MessagePanel"
import { Room } from "../../model/domain/Room"
import RoomMemberList from "./roomMemberList/RoomMemberList"
import CommandHandler from "./CommandHandler"

export default function Chat() {
  
  const [activeRoom, setActiveRoom] = useState<Room | null>(null)

  const chatContextValue = useMemo<ChatContextType>(
    () => ({ activeRoom, setActiveRoom }),
    [activeRoom]
  )
  return (
    <WebsocketProvider>
      <ChatContext.Provider value={chatContextValue}>
        <CommandHandler />
        <div className="grid grid-cols-6 mt-24 px-6 ">
          <div className="col-span-1">
            <RoomManager />
          </div>
          <div className="col-span-4 px-6">
            {!activeRoom ? (
              <h1 className="mb-8">Choose your chat room!</h1>
            ) : (
              <h1 className="mb-8">
                Active Room:{" "}
                <span className="dark:text-blue-400 text-blue-500">
                  {activeRoom?.name}
                </span>
              </h1>
            )}
            <MessagePanel />
            <ChatInput />
          </div>
          <div className="col-span-1 ">
            {activeRoom ? <RoomMemberList /> : ""}
          </div>
        </div>
      </ChatContext.Provider>
    </WebsocketProvider>
  )
}
