import { useEffect, useRef } from "react"
import { useWebsocketContext } from "./context/websocketContext"
import { CHAT_ENDPOINTS } from "../../api/apiEndpoints"

export default function Heartbeat() {
  const { wsClient, isConnected } = useWebsocketContext()

  const heartbeatInterval = useRef<number>(null)
  const healthCheckInterval = useRef<number>(null)
  const serverAliveRef = useRef<boolean>(true)

  useEffect(() => {
    if (wsClient && isConnected) {
      console.log("⏰ Starting heartbeat and healthcheck")

      heartbeatInterval.current = setInterval(() => {
        if (wsClient.connected) {
          wsClient.publish({
            destination: CHAT_ENDPOINTS.heartbeat,
            body: "",
          })
          console.log("📡 Heartbeat sent")
        }
      }, 5000)

      healthCheckInterval.current = setInterval(() => {
        if (!serverAliveRef.current) {
          console.error(
            "🛑 Server not responding to heartbeats. Reconnecting..."
          )

          wsClient.deactivate()
          wsClient.activate()
        }
        serverAliveRef.current = false
      }, 10000)

      wsClient.subscribe(CHAT_ENDPOINTS.heartbeatReply, () => {
        console.log("💓 Heartbeat reply received")
        serverAliveRef.current = true
      })
    }

    return () => {
      console.log("🛑 Cleaning up heartbeat and healthcheck")
      if (heartbeatInterval.current) clearInterval(heartbeatInterval.current)
      if (healthCheckInterval.current)
        clearInterval(healthCheckInterval.current)
      heartbeatInterval.current = null
      healthCheckInterval.current = null
      serverAliveRef.current = true
    }
  }, [wsClient, isConnected])

  return null
}
