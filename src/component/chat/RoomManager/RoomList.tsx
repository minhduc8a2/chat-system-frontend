import { useQuery } from "@tanstack/react-query"
import { QueryRoomKey } from "../../../model/enum/QueryRoomKey"
import { ChatRoomAPI } from "../../../api/ChatRoomAPI"

export default function RoomList() {
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
      {roomList?.map((room) => (
        <div key={room.id}>
          <h2>{room.name}</h2>
          <p>{room.description}</p>
          <p>Status: {room.status}</p>
        </div>
      ))}
    </div>
  )
}
