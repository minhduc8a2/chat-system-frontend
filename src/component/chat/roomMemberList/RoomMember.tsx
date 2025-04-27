import React from "react"
import { BasicUserInfoDTO } from "../../../model/domain/BasicUserInfoDTO"
import { FaUser } from "react-icons/fa6"
import { Avatar } from "@heroui/react"

export default function RoomMember({ member }: { member: BasicUserInfoDTO }) {
    
  return (
    <div>
      <div className="flex gap-x-3 items-center">
        <Avatar size="sm" showFallback fallback={<FaUser />} />
        <h3 className="">{member.username}</h3>
        <div className="w-2 h-2 rounded-full bg-green-500"></div>
      </div>
    </div>
  )
}
