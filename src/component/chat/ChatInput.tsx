import { Button, Form, Input } from "@heroui/react"
import { useContext, useState } from "react"
import { WebsocketContext } from "./context/websocketContext"
import { CHAT_ENDPOINTS } from "../../api/apiEndpoints"
import { ChatContext } from "./context/chatContext"
import { IoSend } from "react-icons/io5"
export default function ChatInput() {
  const [message, setMessage] = useState("")
  const { activeRoom } = useContext(ChatContext)
  const { wsClient, isConnected } = useContext(WebsocketContext)

  const sendMessage = (event?: React.FormEvent | React.MouseEvent) => {
    event?.preventDefault?.()

    if (!isConnected || !wsClient) {
      alert("Not connected to the server.")
      return
    }
    if (message.length == 0) {
      return
    }
    wsClient.publish({
      destination: CHAT_ENDPOINTS.sendToChatRoom + `/${activeRoom!.id}`,
      body: JSON.stringify({ content: message }),
    })

    setMessage("") // clear input
  }

  return (
    <div className="mt-8">
      <Form onSubmit={sendMessage} className="flex flex-row">
        <Input
          isDisabled={!activeRoom}
          type="text"
          isRequired
          value={message}
          onValueChange={(value) => setMessage(value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage(e)
          }}
        />
        <Button
          color="primary"
          isIconOnly
          type="submit"
          isDisabled={!activeRoom}
        >
          <IoSend />
        </Button>
      </Form>
    </div>
  )
}
