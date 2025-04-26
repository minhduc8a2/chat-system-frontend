import { ReactNode, useEffect, useMemo, useRef, useState } from "react"
import { Client } from "@stomp/stompjs"
import { CHAT_ENDPOINTS } from "../../api/apiEndpoints"
import {
  WebsocketContext,
  WebsocketContextType,
} from "./context/websocketContext"
import AuthAPI from "../../api/AuthAPI"
import { TokenStore } from "../../store/tokenStore"
import { useAccessToken } from "../../hook/useAccessToken"

export default function WebsocketProvider({
  children,
}: {
  children: ReactNode
}) {
  const [accessToken] = useAccessToken()
  const [isConnected, setIsConnected] = useState(false)
  const [wsClient, setWsClient] = useState<Client | null>(null)
  const clientRef = useRef<Client | null>(null)

  useEffect(() => {
    console.log("Rerun")
    if (!accessToken) {
      console.log("⛔ No accessToken, skipping WebSocket setup")
      return
    }

    if (!clientRef.current) {
      const client = new Client({
        webSocketFactory: () => {
          const latestToken = TokenStore.getAccessToken() // always read latest
          return new WebSocket(
            CHAT_ENDPOINTS.websocket + "?token=" + latestToken
          )
        },
        reconnectDelay: 5000,
        onConnect: () => {
          console.log("✅ WebSocket connected")
          setIsConnected(true)
          client.subscribe("/user/queue/errors", (message) => {
            const error = JSON.parse(message.body)
            console.error("🚨 Error from server:", error)

            // You can also show a toast notification or alert here
            alert(`Server Error: ${error.message || "Unknown error"}`)
          })
        },
        onDisconnect: () => {
          console.log("❌ WebSocket disconnected")
          setIsConnected(false)
        },
        onStompError: (frame) => {
          console.error("💥 STOMP error", frame)
        },
        onWebSocketError: (error) => {
          console.log(error)
          AuthAPI.refreshToken()
            .then((data) => {
              if (data) {
                TokenStore.storeTokens(data.accessToken, data.refreshToken)
              }
            })
            .catch(() => TokenStore.removeTokens())
        },
      })

      clientRef.current = client
      setWsClient(client)
      client.activate()
    }

    return () => {
      const client = clientRef.current
      if (client && client.active) {
        console.log("🛑 Cleaning up WebSocket")
        client.deactivate()
        setWsClient(null)
        setIsConnected(false)
      }
      clientRef.current = null
    }
  }, [accessToken])

  const websocketContextValue = useMemo<WebsocketContextType>(
    () => ({ wsClient, isConnected }),
    [wsClient, isConnected]
  )

  return (
    <WebsocketContext.Provider value={websocketContextValue}>
      {children}
    </WebsocketContext.Provider>
  )
}
