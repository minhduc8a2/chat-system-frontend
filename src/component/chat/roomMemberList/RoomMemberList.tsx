import { useQuery } from "@tanstack/react-query"
import { QueryRoomKey } from "../../../model/enum/QueryRoomKey"
import { useChatRoomContext } from "../context/chatContext"
import { ChatRoomAPI } from "../../../api/ChatRoomAPI"
import RoomMember from "./RoomMember"
import { useRoomMemberList } from "../../../hook/useRoomMemberList"
import { useEffect, useMemo, useRef } from "react"
import { BasicUserInfoDTO } from "../../../model/domain/BasicUserInfoDTO"
import { useDispatch } from "react-redux"
import { addRoomMemberLists } from "../../../store/slice/roomMemberListSlice"
import { useVirtualizer } from "@tanstack/react-virtual"

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

  const parentRef = useRef<HTMLDivElement>(null)

  const virtualizer = useVirtualizer({
    count: memberList.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 60,
    getItemKey: (index) => memberList[index].id,
    measureElement: (el) => el.getBoundingClientRect().height,
  })

  const virtualItems = virtualizer.getVirtualItems()

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>{error.message}</p>

  console.log(data)
  return (
    <div className="border-l-2 border-l-white/15 px-6 ">
      <h2 className="text-3xl mb-6 ">Members</h2>
      <div className=" h-96 overflow-y-auto overflow-x-hidden" ref={parentRef}>
        <ul
          style={{
            height: `${virtualizer.getTotalSize()}px`,
            width: "100%",
            position: "relative",
          }}
        >
          {virtualItems.map((virtualItem) => {
            const member = memberList[virtualItem.index]
            return (
              <div
                key={virtualItem.key}
                ref={(el) => {
                  if (el) virtualizer.measureElement(el)
                }}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  transform: `translateY(${virtualItem.start}px)`,
                }}
                data-index={virtualItem.index}
              >
                <div className="mt-3">
                  <RoomMember member={member} />
                </div>
              </div>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
