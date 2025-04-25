/* eslint-disable @typescript-eslint/no-explicit-any */
import { RoomStatus } from "../enum/RoomStatus"
import { RoomType } from "../enum/RoomType"

export class Room {
    id: number
    name: string
    description: string
    type: RoomType
    status: RoomStatus
    ownerId: number
    createdAt: string
    updatedAt: string
  
    constructor(
      id: number,
      name: string,
      description: string,
      type: RoomType,
      status: RoomStatus,
      ownerId: number,
      createdAt: string,
      updatedAt: string
    ) {
      this.id = id
      this.name = name
      this.description = description
      this.type = type
      this.status = status
      this.ownerId = ownerId
      this.createdAt = createdAt
      this.updatedAt = updatedAt
    }
  
    static fromJSON(data: any): Room {
      return new Room(
        data.id,
        data.name,
        data.description,
        data.type,
        data.status,
        data.ownerId,
        data.createdAt,
        data.updatedAt
      )
    }
  }