import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react"
import { useState } from "react"
import { LuCirclePlus } from "react-icons/lu"
import CreateRoom from "./CreateRoom"
import JoinRoom from "./JoinRoom"
export default function Options() {
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isJoinOpen, setIsJoinOpen] = useState(false)
  return (
    <>
      <CreateRoom isOpen={isCreateOpen} setIsOpen={setIsCreateOpen} />
      <JoinRoom isOpen={isJoinOpen} setIsOpen={setIsJoinOpen} />
      <Dropdown>
        <DropdownTrigger>
          <Button isIconOnly>
            <LuCirclePlus className="text-xl" />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Static Actions"
          onAction={(key) => {
            switch (key) {
              case "join":
                setIsJoinOpen(true)
                break
              case "create":
                setIsCreateOpen(true)
                break
              default:
                break
            }
          }}
        >
          <DropdownItem key="join">Join a room</DropdownItem>
          <DropdownItem key="create">Create new room</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </>
  )
}
