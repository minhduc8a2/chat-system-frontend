import { Button, Form, Input } from "@heroui/react"
import { useContext, useState } from "react"
import { WebsocketContext } from "./context/websocketContext"
import { CHAT_ENDPOINTS } from "../../api/apiEndpoints"
import { ChatContext } from "./context/chatContext"

export default function ChatInput() {
  const [message, setMessage] = useState("")
  const { activeRoomId } = useContext(ChatContext)
  const { wsClient, isConnected } = useContext(WebsocketContext)

  const sendMessage = (event?: React.FormEvent | React.MouseEvent) => {
    event?.preventDefault?.()

    if (!isConnected || !wsClient) {
      alert("Not connected to the server.")
      return
    }

    if (!activeRoomId) {
      alert("No active room selected.")
      return
    }

    if (!message.trim()) {
      alert("Cannot send an empty message.")
      return
    }

    wsClient.publish({
      destination: CHAT_ENDPOINTS.sendToChatRoom + `/${activeRoomId}`,
      body: JSON.stringify({ content: message }),
    })

    setMessage("") // clear input
  }

  return (
    <div className="flex justify-center items-center">
      <Form onSubmit={sendMessage}>
        <Input
          type="text"
          value={message}
          onValueChange={(value) => setMessage(value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage(e)
          }}
        />
        <Button color="primary" type="submit">
          Send
        </Button>
      </Form>
    </div>
  )
}
