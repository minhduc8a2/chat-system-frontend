import { useEffect, useRef, useState } from "react"
import { useVirtualizer } from "@tanstack/react-virtual"
import { CHAT_ENDPOINTS } from "../../api/apiEndpoints"
import { useWebsocketContext } from "./context/websocketContext"
import { useChatRoomContext } from "./context/chatContext"
import { Card, CardBody } from "@heroui/react"
import { useAuth } from "../../hook/useAuth"
import { MessageAPI } from "../../api/MessageAPI"
import { MessageDTO } from "../../model/domain/MessageDTO"
import { InfiniteScrollResult } from "../../model/domain/InfiniteScrollResult"

export default function MessagePanel() {
  const { authInfo } = useAuth()
  const { wsClient, isConnected } = useWebsocketContext()
  const { activeRoom } = useChatRoomContext()

  const [infiniteScrollState, setInfiniteScrollState] = useState<
    InfiniteScrollResult<MessageDTO>
  >({
    hasMoreOnTop: false,
    hasMoreOnBottom: false,
    data: [],
  })

  const [isFetchingTop, setIsFetchingTop] = useState(false)
  const [isFetchingBottom, setIsFetchingBottom] = useState(false)

  const loadingRef = useRef(false)
  const parentRef = useRef<HTMLDivElement>(null)

  const scrollLockRef = useRef<boolean>(false)
  const pendingScrollIndexRef = useRef<number | null>(null)

  // Function to update the state with new messages
  const updateData = (
    newState: InfiniteScrollResult<MessageDTO>,
    isTop: boolean = false
  ) => {
    setInfiniteScrollState((prev) => ({
      hasMoreOnTop: newState.hasMoreOnTop,
      hasMoreOnBottom: newState.hasMoreOnBottom,
      data: isTop
        ? [...newState.data, ...prev.data]
        : [...prev.data, ...newState.data],
    }))
  }

  // Initial message load
  useEffect(() => {
    if (!activeRoom) return

    setInfiniteScrollState({
      hasMoreOnBottom: false,
      hasMoreOnTop: false,
      data: [],
    })

    const loadInitial = async () => {
      loadingRef.current = true
      scrollLockRef.current = true // 🔐 Lock scroll

      const result = await MessageAPI.getMessagesByLastSeen(activeRoom.id)

      if (result.data.length === 0 && result.hasMoreOnTop) {
        const older = await MessageAPI.getMessagesByLastMessageId(
          activeRoom.id,
          null,
          "top"
        )
        updateData(older, true)
        pendingScrollIndexRef.current = older.data.length - 1 // scroll to bottom
      } else {
        updateData(result)
        pendingScrollIndexRef.current = 0
      }

      loadingRef.current = false
    }

    loadInitial()
  }, [activeRoom])

  // WebSocket listener for real-time messages
  useEffect(() => {
    if (!wsClient || !isConnected || !activeRoom) return

    const subscription = wsClient.subscribe(
      CHAT_ENDPOINTS.receiveFromChatRoom + `/${activeRoom.id}`,
      (message) => {
        const parsedMessage = JSON.parse(message.body)
        setInfiniteScrollState((prev) => {
          scrollLockRef.current = true
          pendingScrollIndexRef.current = prev.data.length
          return {
            ...prev,
            data: [...prev.data, parsedMessage],
          }
        })
      }
    )

    return () => {
      wsClient.publish({
        destination: CHAT_ENDPOINTS.unsubcribeBuilder(activeRoom.id),
        body: "U",
      })
      subscription.unsubscribe()
    }
  }, [wsClient, activeRoom, isConnected])

  // Virtualizer setup
  const virtualizer = useVirtualizer({
    count: infiniteScrollState.data.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 60,
    getItemKey: (index) => infiniteScrollState.data[index].id,
    measureElement: (el) => el.getBoundingClientRect().height,
  })

  const virtualItems = virtualizer.getVirtualItems()

  const timeOutRef = useRef<number | null>(0)
  useEffect(() => {
    timeOutRef.current = setTimeout(() => {
      const [firstItem] = virtualItems
      const [lastItem] = [...virtualItems].reverse()

      const fetchMoreOnTop = async () => {
        if (!activeRoom || isFetchingTop) return
        setIsFetchingTop(true)

        scrollLockRef.current = true

        const firstMessage = infiniteScrollState.data[0]
        try {
          const result = await MessageAPI.getMessagesByLastMessageId(
            activeRoom.id,
            firstMessage.id,
            "top"
          )
          updateData(result, true)
          pendingScrollIndexRef.current = result.data.length
        } finally {
          setIsFetchingTop(false)
        }
      }

      const fetchMoreOnBottom = async () => {
        if (!activeRoom || isFetchingBottom) return
        setIsFetchingBottom(true)
        const lastMessage =
          infiniteScrollState.data[infiniteScrollState.data.length - 1]

        scrollLockRef.current = true
        pendingScrollIndexRef.current = infiniteScrollState.data.length
        try {
          const result = await MessageAPI.getMessagesByLastMessageId(
            activeRoom.id,
            lastMessage.id,
            "bottom"
          )
          updateData(result, false)
        } finally {
          setIsFetchingBottom(false)
        }
      }

      if (
        firstItem?.index <= 2 &&
        infiniteScrollState.hasMoreOnTop &&
        !isFetchingTop
      ) {
        fetchMoreOnTop()
      }

      if (
        lastItem?.index === infiniteScrollState.data.length - 1 &&
        infiniteScrollState.hasMoreOnBottom &&
        !isFetchingBottom
      ) {
        fetchMoreOnBottom()
      }
    }, 500)

    return () => {
      if (timeOutRef.current) clearTimeout(timeOutRef.current)
    }
  }, [
    virtualItems,
    infiniteScrollState,
    isFetchingTop,
    isFetchingBottom,
    activeRoom,
  ])

  useEffect(() => {
    if (
      scrollLockRef.current &&
      pendingScrollIndexRef.current !== null &&
      virtualizer.getVirtualItems().length > 0
    ) {
      console.log("Scroll to index: ", pendingScrollIndexRef.current)
      virtualizer.scrollToIndex(pendingScrollIndexRef.current, {
        align: "start",
      })
      pendingScrollIndexRef.current = null
      scrollLockRef.current = false // 🔓 Release the lock
    }
  }, [virtualItems, virtualizer])

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
          const msg = infiniteScrollState.data[virtualItem.index]
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
              className={`px-4 py-2 m-2 whitespace-pre-wrap break-words flex ${
                msg.senderId === authInfo?.userId
                  ? "justify-end"
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
