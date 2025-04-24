import { Client } from "@stomp/stompjs"
import { createContext } from "react"

export type WebsocketContextType = {
  wsClient: Client | null
  isConnected: boolean
}

export const WebsocketContext = createContext<WebsocketContextType>({
  wsClient: null,
  isConnected: false,
})
