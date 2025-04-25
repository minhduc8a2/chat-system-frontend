import {
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { Client } from "@stomp/stompjs"
import { CHAT_ENDPOINTS } from "../../api/apiEndpoints"
import { AuthContext } from "../auth/authProvider/AuthContext"
import {
  WebsocketContext,
  WebsocketContextType,
} from "./context/websocketContext"

export default function WebsocketProvider({
  children,
}: {
  children: ReactNode
}) {
  const { accessToken } = useContext(AuthContext)
  const [isConnected, setIsConnected] = useState(false)
  const [wsClient, setWsClient] = useState<Client | null>(null)
  const clientRef = useRef<Client | null>(null)

  useEffect(() => {
    if (!accessToken) {
      console.log("⛔ No accessToken, skipping WebSocket setup")
      return
    }

    if (!clientRef.current) {
      const client = new Client({
        brokerURL: CHAT_ENDPOINTS.websocket + "?token=" + accessToken,
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
        clientRef.current = null
        setWsClient(null)
        setIsConnected(false)
      }
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
