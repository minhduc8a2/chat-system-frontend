import { useQuery } from "@tanstack/react-query"
import { QueryRoomKey } from "../../../model/enum/QueryRoomKey"
import { ChatRoomAPI } from "../../../api/ChatRoomAPI"
import { Listbox, ListboxItem } from "@heroui/react"
import { useContext } from "react"
import { ChatContext } from "../context/chatContext"
import { HiUserGroup } from "react-icons/hi"

export default function RoomList() {
  const { setActiveRoom } = useContext(ChatContext)
  const {
    data: roomList,
    isLoading,
    error,
  } = useQuery({
    queryKey: [QueryRoomKey.ROOM_LIST],
    queryFn: ChatRoomAPI.getChatRoomList,
  })
  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error loading rooms: {error.message}</p>
  return (
    <div>
      <Listbox
        aria-label="Room list"
        items={roomList}
        onAction={(key) => {
          const id = parseInt(key.toString())
          setActiveRoom(roomList!.find((r) => r.id == id)!)
          console.log("active room id: " + key.toString())
        }}
        isVirtualized
        virtualization={{
          maxListboxHeight: 400,
          itemHeight: 40,
        }}
      >
        {(room) => (
          <ListboxItem key={room.id} startContent={<HiUserGroup />}>
            {room.name}
          </ListboxItem>
        )}
      </Listbox>
    </div>
  )
}
