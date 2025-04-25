import { FormEvent, useRef } from "react"
import {
  Button,
  Form,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  Select,
  SelectItem,
} from "@heroui/react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ChatRoomAPI } from "../../../api/ChatRoomAPI"
import { RoomType } from "../../../model/enum/RoomType"
import { QueryRoomKey } from "../../../model/enum/QueryRoomKey"

const roomTypes = Object.values(RoomType).map((key) => ({
  key,
  label: key[0] + key.slice(1).toLowerCase(),
}))
export default function CreateRoom({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const roomNameRef = useRef<string>("Room 1")
  const roomTypeRef = useRef<RoomType>(roomTypes[0].key)
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: () => {
      if (roomNameRef.current.length == 0) throw Error("Room name is required")
      return ChatRoomAPI.createChatRoom(
        roomNameRef.current,
        roomTypeRef.current
      )
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryRoomKey.ROOM_LIST] })
      setIsOpen(false)
    },
    onError: (e: Error) => {
      alert("Error: " + e.message)
    },
  })
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    mutation.mutate()
  }
  return (
    <Modal isOpen={isOpen} onOpenChange={() => setIsOpen(false)}>
      <ModalContent>
        <ModalBody>
          <Form onSubmit={handleSubmit} className="grid gap-y-4 my-4">
            <Input
              label="Create new room"
              labelPlacement="outside"
              type="text"
              placeholder="Room name"
              onValueChange={(value) => (roomNameRef.current = value)}
            />
            <Select
              className="max-w-xs"
              items={roomTypes}
              label="Room type"
              defaultSelectedKeys={[roomTypes[0].key]}
              labelPlacement="outside"
              placeholder="Select an type"
              onSelectionChange={(s) => {
                roomTypeRef.current = s.currentKey! as RoomType
              }}
            >
              {(roomType) => <SelectItem>{roomType.label}</SelectItem>}
            </Select>
            <Button type="submit" color="primary">
              Create room
            </Button>
          </Form>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
