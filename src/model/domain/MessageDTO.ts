import { MessageType } from "../enum/MessageType"

interface MessageDTOParams {
  id: number
  senderId: number
  roomId: number
  content: string
  type: MessageType
  timestamp: string
}

export class MessageDTO {
  id: number
  senderId: number
  roomId: number
  content: string
  type: MessageType
  timestamp: string

  constructor({
    id,
    senderId,
    roomId,
    content,
    type,
    timestamp,
  }: MessageDTOParams) {
    this.id = id
    this.senderId = senderId
    this.roomId = roomId
    this.content = content
    this.type = type
    this.timestamp = timestamp
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromJSON(data: any): MessageDTO {
    return new MessageDTO({
      id: data.id,
      senderId: data.senderId,
      roomId: data.roomId,
      content: data.content,
      type: data.type,
      timestamp: data.timestamp,
    })
  }
}
