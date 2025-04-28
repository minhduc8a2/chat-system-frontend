import { useQuery } from "@tanstack/react-query"
import { QueryRoomKey } from "../../../model/enum/QueryRoomKey"
import { useChatRoomContext } from "../context/chatContext"
import { ChatRoomAPI } from "../../../api/ChatRoomAPI"
import RoomMember from "./RoomMember"
import { useRoomMemberList } from "../../../hook/useRoomMemberList"
import { useEffect, useMemo } from "react"
import { BasicUserInfoDTO } from "../../../model/domain/BasicUserInfoDTO"
import { useDispatch } from "react-redux"
import { addRoomMemberLists } from "../../../store/slice/roomMemberListSlice"

export default function RoomMemberList() {
  const dispatch = useDispatch()
  const { roomMemberList } = useRoomMemberList()
  const { activeRoom } = useChatRoomContext()
  const { data, isLoading, error } = useQuery({
    queryKey: [QueryRoomKey.MEMBER_LIST + activeRoom?.id],
    queryFn: () => ChatRoomAPI.getMemberList(activeRoom!.id),
  })

  useEffect(() => {
    if (data) {
      dispatch(addRoomMemberLists(data))
    }
  }, [data, dispatch])

  const memberList = useMemo<BasicUserInfoDTO[]>(() => {
    return Object.values(roomMemberList)
  }, [roomMemberList])

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>{error.message}</p>

  console.log(data)
  return (
    <div>
      <h2 className="text-3xl mb-6">Members</h2>
      <ul className="grid gap-y-3">
        {memberList!.map((member) => {
          return (
            <li key={member.id}>
              <RoomMember member={member} />
            </li>
          )
        })}
      </ul>
    </div>
  )
}
