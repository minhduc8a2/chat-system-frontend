import { InfiniteScrollResult } from "../model/domain/InfiniteScrollResult"
import api from "../util/requester"
import { API_GATEWAY_URL } from "./apiEndpoints"

export const MESSAGE_SERVICE_URL = `${API_GATEWAY_URL}/api/v1/messages`
export const USER_PROFILE_ENDPOINTS = {
  getMessagesByLastMessageId: `${MESSAGE_SERVICE_URL}`,
  getMessagesByLastSeen: `${MESSAGE_SERVICE_URL}/last_seen`,
}

export class MessageAPI {
  static async getMessagesByLastMessageId(
    chatRoomId: number,
    messageId: number,
    type: "top" | "bottom"
  ): Promise<InfiniteScrollResult> {
    const res = await api.get(
      USER_PROFILE_ENDPOINTS.getMessagesByLastMessageId +
        `?chatRoomId=${chatRoomId}&messageId=${messageId}&type=${type}`
    )
    return res.data
  }

  static async getMessagesByLastSeen(
    chatRoomId: number
  ): Promise<InfiniteScrollResult> {
    const res = await api.get(
      USER_PROFILE_ENDPOINTS.getMessagesByLastSeen + `?chatRoomId=${chatRoomId}`
    )
    return res.data
  }
}
