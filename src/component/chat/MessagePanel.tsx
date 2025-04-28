import { useContext, useEffect, useRef, useState } from "react"
import { useVirtualizer } from "@tanstack/react-virtual"

import { CHAT_ENDPOINTS } from "../../api/apiEndpoints"
import {
  WebsocketContext,
  WebsocketContextType,
} from "./context/websocketContext"
import { ChatContext, ChatContextType } from "./context/chatContext"
import { MessageDTO } from "../../model/domain/MessageDTO"
import { Card, CardBody } from "@heroui/react"
import { AuthContext } from "../auth/authProvider/AuthContext"

export default function MessagePanel() {
  const { authInfo } = useContext(AuthContext)
  const { wsClient, isConnected } =
    useContext<WebsocketContextType>(WebsocketContext)
  const { activeRoom } = useContext<ChatContextType>(ChatContext)
  const [messageList, setMessageList] = useState<MessageDTO[]>([])

  useEffect(() => {
    ///init message with fetch
    setMessageList([]) 
  }, [activeRoom])

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

  const parentRef = useRef<HTMLDivElement>(null)

  const virtualizer = useVirtualizer({
    count: messageList.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 60, // reasonable default
    getItemKey: (index) =>
      messageList[index].timestamp + "_" + messageList[index].senderId,
    measureElement: (el) => el.getBoundingClientRect().height,
  })

  const virtualItems = virtualizer.getVirtualItems()

  return (
    <div className="h-96 overflow-y-auto overflow-x-hidden" ref={parentRef}>
      <ul
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          width: "100%",
          position: "relative",
        }}
      >
        {virtualItems.map((virtualItem) => {
          const msg = messageList[virtualItem.index]
          return (
            <div
              key={virtualItem.key}
              ref={(el) => {
                if (el) virtualizer.measureElement(el)
              }}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                transform: `translateY(${virtualItem.start}px)`,
              }}
              data-index={virtualItem.index}
              className={`px-4 py-2 m-2  whitespace-pre-wrap break-words  flex ${
                msg.senderId === authInfo?.userId
                  ? "justify-end "
                  : "justify-start"
              }`}
            >
              <Card>
                <CardBody>{msg.content}</CardBody>
              </Card>
            </div>
          )
        })}
      </ul>
    </div>
  )
}
