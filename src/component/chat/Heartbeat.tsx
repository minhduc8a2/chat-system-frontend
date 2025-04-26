import { useEffect, useRef } from "react"
import { useWebsocketContext } from "./context/websocketContext"
import { CHAT_ENDPOINTS } from "../../api/apiEndpoints"

export default function Heartbeat() {
  const { wsClient, isConnected } = useWebsocketContext()
  const scheduledTask = useRef<number>(null)
  useEffect(() => {
    if (wsClient && isConnected) {
      scheduledTask.current = setInterval(() => {
        wsClient.publish({
          destination: CHAT_ENDPOINTS.heartbeat,
          body: "",
        })
      }, 3000)
    }
    return () => {
      if (scheduledTask.current) {
        clearInterval(scheduledTask.current)
      }
      scheduledTask.current = null
    }
  }, [wsClient, isConnected])
  return <></>
}
