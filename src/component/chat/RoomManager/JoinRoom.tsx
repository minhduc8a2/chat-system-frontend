import { FormEvent, useRef } from "react"
import {
  Button,
  Form,
  Input,
  Modal,
  ModalBody,
  ModalContent,
} from "@heroui/react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ChatRoomAPI } from "../../../api/ChatRoomAPI"
import { QueryRoomKey } from "../../../model/enum/QueryRoomKey"
import { useHttpErrorHandler } from "../../../util/HttpErrorHandler"

export default function JoinRoom({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const roomIdRef = useRef<string>("Room 1")
  const queryClient = useQueryClient()
  const { handle } = useHttpErrorHandler()
  const mutation = useMutation({
    mutationFn: () => {
      if (roomIdRef.current.length == 0) throw Error("Room ID is required")
      let roomId
      try {
        roomId = parseInt(roomIdRef.current)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        throw Error("Room ID must be a number")
      }
      return ChatRoomAPI.joinChatRoom(roomId)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryRoomKey.ROOM_LIST] })
      setIsOpen(false)
    },
    onError: (e: Error) => {
      handle(e, {
        404: "Room ID does not exist.",
        400: "You have already joined this room.",
      })
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
              label="Room ID"
              labelPlacement="outside"
              type="number"
              placeholder="Example: 1"
              onValueChange={(value) => (roomIdRef.current = value)}
            />
            <Button
              type="submit"
              color="primary"
              isLoading={mutation.isPending}
              isDisabled={mutation.isPending}
            >
              Join room
            </Button>
          </Form>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
