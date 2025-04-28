import { useEffect } from "react"
import { CHAT_ENDPOINTS } from "../../api/apiEndpoints"
import { useChatRoomContext } from "./context/chatContext"
import { useWebsocketContext } from "./context/websocketContext"
import { BasicUserInfoDTO } from "../../model/domain/BasicUserInfoDTO"
import { CommandDTO } from "../../model/domain/CommandDTO"
import { CommandType } from "../../model/enum/CommandType"
import { useDispatch } from "react-redux"
import { addRoomMember } from "../../store/slice/roomMemberListSlice"

export default function CommandHandler() {
  const { wsClient, isConnected } = useWebsocketContext()
  const { activeRoom } = useChatRoomContext()
  const dispatch = useDispatch()

  useEffect(() => {
    const handleCommand = (commandDTO: CommandDTO) => {
      switch (commandDTO.type) {
        case CommandType.MEMBER_JOIN:
          handleMemberJoinCommand(commandDTO)
          break

        default:
          break
      }
    }
    const handleMemberJoinCommand = (commandDTO: CommandDTO) => {
      dispatch(
        addRoomMember(JSON.parse(commandDTO.payload) as BasicUserInfoDTO)
      )
    }
    if (wsClient && isConnected && activeRoom) {
      wsClient.subscribe(
        CHAT_ENDPOINTS.roomCommandBuilder(activeRoom.id),
        (message) => {
          const commandDTO = JSON.parse(message.body) as CommandDTO
          console.log("Receive command: " + commandDTO.payload)
          handleCommand(commandDTO)
        }
      )
    }

    return () => {
      console.log("🛑 Cleaning up heartbeat and healthcheck")
    }
  }, [wsClient, isConnected, activeRoom, dispatch])

  return null
}
