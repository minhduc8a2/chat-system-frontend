import React, { useEffect } from "react"
import { BasicUserInfoDTO } from "../../../model/domain/BasicUserInfoDTO"
import { FaUser } from "react-icons/fa6"
import { Avatar } from "@heroui/react"
import { useDispatch } from "react-redux"
import { useWebsocketContext } from "../context/websocketContext"
import { CHAT_ENDPOINTS } from "../../../api/apiEndpoints"
import { updateMemberStatus } from "../../../store/slice/roomMemberListSlice"
import { UserPresenceDTO } from "../../../model/domain/UserPresenceDTO"
import { useAuth } from "../../../hook/useAuth"

export default function RoomMember({ member }: { member: BasicUserInfoDTO }) {
  const dispatch = useDispatch()
  const { wsClient, isConnected } = useWebsocketContext()
  const { authInfo } = useAuth()
  useEffect(() => {
    if (wsClient && isConnected && authInfo?.userId != member.id) {
      wsClient.subscribe(
        CHAT_ENDPOINTS.publicPresence + `/${member.id}`,
        (message) => {
          const userPresence: UserPresenceDTO = JSON.parse(message.body)
          console.log("Receive user status: " + userPresence.isOnline)
          dispatch(
            updateMemberStatus({
              memberId: userPresence.id.toString(),
              isOnline: userPresence.isOnline,
            })
          )
        }
      )
    }

    return () => {
      try {
        if (authInfo?.userId != member.id) {
          wsClient?.unsubscribe(CHAT_ENDPOINTS.publicPresence)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }, [wsClient, isConnected, dispatch, member.id, authInfo?.userId])
  return (
    <div>
      <div className="flex gap-x-3 items-center">
        <Avatar size="sm" showFallback fallback={<FaUser />} />
        <h3 className="">
          {authInfo?.userId != member.id ? member.username : "You"}
        </h3>
        <div
          className={`w-2 h-2 rounded-full ${
            member.isOnline ? "bg-green-500" : "bg-slate-500"
          }`}
        ></div>
      </div>
    </div>
  )
}
