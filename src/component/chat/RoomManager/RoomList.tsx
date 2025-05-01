import { useQuery } from "@tanstack/react-query"
import { QueryRoomKey } from "../../../model/enum/QueryRoomKey"
import { ChatRoomAPI } from "../../../api/ChatRoomAPI"
import { Listbox, ListboxItem, Selection } from "@heroui/react"
import { useContext, useState, useEffect } from "react"
import { ChatContext } from "../context/chatContext"
import { HiUserGroup } from "react-icons/hi"
import { useNavigate, useParams } from "@tanstack/react-router"
import { AppRoute } from "../../../model/enum/AppRoutes"

export default function RoomList() {
  const { id } = useParams({ strict: false }) as { id?: string }
  const { setActiveRoom } = useContext(ChatContext)
  const navigate = useNavigate()
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]))

  const {
    data: roomList,
    isLoading,
    error,
  } = useQuery({
    queryKey: [QueryRoomKey.ROOM_LIST],
    queryFn: ChatRoomAPI.getChatRoomList,
  })
  useEffect(() => {
    console.log("Id: ",id);
    if (roomList) {
      if (!id) return
      const room = roomList.find((r) => r.id == parseInt(id))
      if (room) {
        setActiveRoom(room)
      }
    }
  }, [roomList, id, setActiveRoom])

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error loading rooms: {error.message}</p>

  return (
    <div>
      <Listbox
        aria-label="Room list"
        items={roomList}
        selectedKeys={selectedKeys}
        onSelectionChange={(keys) => {
          setSelectedKeys(keys)
          const id = parseInt(Array.from(keys)[0].toString())
          setActiveRoom(roomList!.find((r) => r.id == id)!)
          console.log("active room id: " + id)
          navigate({ to: AppRoute.CHAT + `/${id}` })
        }}
        selectionMode="single"
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
