import { Client } from "@stomp/stompjs"
import { createContext, useContext } from "react"

export type WebsocketContextType = {
  wsClient: Client | null
  isConnected: boolean
}

export const WebsocketContext = createContext<WebsocketContextType>({
  wsClient: null,
  isConnected: false,
})

export const useWebsocketContext = ()=>{
  const context = useContext(WebsocketContext)

  return context
}
