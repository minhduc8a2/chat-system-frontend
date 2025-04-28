import { CommandType } from "../enum/CommandType"

export interface CommandDTO {
  chatRoomId: number
  payload: string
  type: CommandType
}
