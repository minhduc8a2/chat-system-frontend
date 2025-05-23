/* eslint-disable @typescript-eslint/no-explicit-any */
import { BasicUserInfoDTO } from "../model/domain/BasicUserInfoDTO"
import { Room } from "../model/domain/Room"
import { RoomType } from "../model/enum/RoomType"
import api from "../util/requester"
import { API_GATEWAY_URL } from "./apiEndpoints"

export const CHAT_SERVICE_URL = `${API_GATEWAY_URL}/api/v1/chat`
export const CHAT_ROOM_ENDPOINTS = {
  createRoom: `${CHAT_SERVICE_URL}/chat-rooms`,
  joinRoom: `${CHAT_SERVICE_URL}/chat-rooms/join`,
  getRooms: `${CHAT_SERVICE_URL}/chat-rooms`,
  getMemberList: `${CHAT_SERVICE_URL}/chat-rooms`,
}

export class ChatRoomAPI {
  static async createChatRoom(name: string, type: RoomType) {
    return api.post(CHAT_ROOM_ENDPOINTS.createRoom, { name, type })
  }

  static async joinChatRoom(id: number) {
    return api.post(CHAT_ROOM_ENDPOINTS.joinRoom + `/${id}`)
  }

  static async getChatRoomList(): Promise<Room[]> {
    const response = await api.get(CHAT_ROOM_ENDPOINTS.getRooms + `/user`)
    return response.data.content.map((roomData: any) => Room.fromJSON(roomData))
  }

  static async getMemberList(chatRoomId: number): Promise<BasicUserInfoDTO[]> {
    const response = await api.get(
      CHAT_ROOM_ENDPOINTS.getMemberList + `/${chatRoomId}/members`
    )
    return response.data.content.map((member: any) => ({
      id: member.id,
      username: member.username,
      isOnline: member.isOnline,
    }))
  }
}
