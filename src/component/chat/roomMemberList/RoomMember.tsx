import React, { useEffect } from "react"
import { BasicUserInfoDTO } from "../../../model/domain/BasicUserInfoDTO"
import { FaUser } from "react-icons/fa6"
import { Avatar } from "@heroui/react"
import { useDispatch } from "react-redux"
import { useWebsocketContext } from "../context/websocketContext"
import { CHAT_ENDPOINTS } from "../../../api/apiEndpoints"
import { updateMemberStatus } from "../../../store/slice/roomMemberListSlice"

interface UserPresence {
  userId: number
  isOnline: boolean
}
export default function RoomMember({ member }: { member: BasicUserInfoDTO }) {
  const dispatch = useDispatch()
  const { wsClient, isConnected } = useWebsocketContext()
  useEffect(() => {
    if (wsClient && isConnected) {
      wsClient.subscribe(
        CHAT_ENDPOINTS.publicPresence + `/${member.id}`,
        (message) => {
          const userPresence: UserPresence = JSON.parse(message.body)
          console.log("Receive user status: " + userPresence.isOnline)
          dispatch(
            updateMemberStatus({
              memberId: userPresence.userId.toString(),
              isOnline: userPresence.isOnline,
            })
          )
        }
      )
    }

    return () => {
      wsClient?.unsubscribe(CHAT_ENDPOINTS.publicPresence)
    }
  }, [wsClient, isConnected, dispatch, member.id])
  return (
    <div>
      <div className="flex gap-x-3 items-center">
        <Avatar size="sm" showFallback fallback={<FaUser />} />
        <h3 className="">{member.username}</h3>
        <div
          className={`w-2 h-2 rounded-full ${
            member.isOnline ? "bg-green-500" : "bg-slate-500"
          }`}
        ></div>
      </div>
    </div>
  )
}
