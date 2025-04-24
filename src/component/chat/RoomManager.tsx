import { useContext, useRef } from "react"
import { Button, Form, Input } from "@heroui/react"
import { ChatContext, ChatContextType } from "./context/chatContext"

export default function RoomManager() {
  const {
    // activeRoomId,
    setActiveRoomId,
  } = useContext<ChatContextType>(ChatContext)

  const roomIdRef = useRef<number | null>(1)

  const handleInputChange = (value: string) => {
    const parsed = parseInt(value)
    if (!isNaN(parsed)) {
      roomIdRef.current = parsed
    } else {
      roomIdRef.current = null
    }
  }

  const handleJoinRoom = () => {
    if (roomIdRef.current !== null) {
      setActiveRoomId(roomIdRef.current)
    } else {
      console.warn("Invalid room ID")
    }
  }
  return (
    <div className="flex justity-center items-center pt-24 flex-col ">
      <Form>
        <Input
          type="number"
          defaultValue="1"
          onValueChange={handleInputChange}
        />
        <Button onPress={handleJoinRoom}>Join room</Button>
      </Form>
    </div>
  )
}
