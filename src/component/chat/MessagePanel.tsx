import { useContext, useEffect, useState } from "react"

import { CHAT_ENDPOINTS } from "../../api/apiEndpoints"
import {
  WebsocketContext,
  WebsocketContextType,
} from "./context/websocketContext"
import { ChatContext, ChatContextType } from "./context/chatContext"
import { MessageDTO } from "../../model/domain/MessageDTO"

export default function MessagePanel() {
  const { wsClient, isConnected } =
    useContext<WebsocketContextType>(WebsocketContext)
  const { activeRoom } = useContext<ChatContextType>(ChatContext)
  const [messageList, setMessageList] = useState<MessageDTO[]>([])
  useEffect(() => {
    if (!wsClient || !isConnected || !activeRoom) return

    const subscription = wsClient.subscribe(
      CHAT_ENDPOINTS.receiveFromChatRoom + `/${activeRoom.id}`,
      (message) => {
        const parsedMessage = JSON.parse(message.body)
        setMessageList((prev) => [...prev, MessageDTO.fromJSON(parsedMessage)])
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [wsClient, activeRoom, isConnected])
  return (
    <div>
      <ul >
        {messageList.map((msg) => (
          <li key={msg.id} className="my-2 text-lg">
            {msg.content}
          </li>
        ))}
      </ul>
    </div>
  )
}
