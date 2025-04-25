import { RoomType } from "../enum/RoomType"
import api from "../util/requester"
import { API_GATEWAY_URL } from "./apiEndpoints"

export const CHAT_SERVICE_URL = `${API_GATEWAY_URL}/api/v1/chat`
export const CHAT_ROOM_ENDPOINTS = {
  createRoom: `${CHAT_SERVICE_URL}/chat-rooms`,
  getRooms: `${CHAT_SERVICE_URL}/chat-rooms`,
}

export class ChatRoomAPI {
  static async createChatRoom(name: string, type: RoomType) {
    return api.post(CHAT_ROOM_ENDPOINTS.createRoom, { name, type })
  }
}
