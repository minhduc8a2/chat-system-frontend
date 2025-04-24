import { useContext, useEffect, useState } from "react"

import { CHAT_ENDPOINTS } from "../../api/apiEndpoints"
import {
  WebsocketContext,
  WebsocketContextType,
} from "./context/websocketContext"
import { ChatContext, ChatContextType } from "./context/chatContext"

export interface MessageType {
  id: number
  content: string
  createdAt: string
}

export default function MessagePanel() {
  const { wsClient, isConnected } =
    useContext<WebsocketContextType>(WebsocketContext)
  const { activeRoomId } = useContext<ChatContextType>(ChatContext)
  const [messageList, setMessageList] = useState<MessageType[]>([])
  useEffect(() => {
    if (!wsClient || !isConnected || !activeRoomId) return

    const subscription = wsClient.subscribe(
      CHAT_ENDPOINTS.receiveFromChatRoom + `/${activeRoomId}`,
      (message) => {
        const parsedMessage = JSON.parse(message.body)
        setMessageList((prev) => [
          ...prev,
          {
            id: parsedMessage.id,
            content: parsedMessage.content,
            createdAt: parsedMessage.createdAt,
          },
        ])
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [wsClient, activeRoomId, isConnected])
  return (
    <div>
      <h2>Messages</h2>
      <ul>
        {messageList.map((msg) => (
          <li key={msg.id} className="my-2 text-lg">
            {msg.content}
          </li>
        ))}
      </ul>
    </div>
  )
}
