import { UserProfile } from "../model/domain/UserProfile"
import api from "../util/requester"
import { API_GATEWAY_URL } from "./apiEndpoints"

export const USER_SERVICE_URL = `${API_GATEWAY_URL}/api/v1/users`
export const USER_PROFILE_ENDPOINTS = {
  getProfile: `${USER_SERVICE_URL}`,
}

export class UserAPI {
  static async getProfile(userId: number): Promise<UserProfile> {
    const res = await api.get(USER_PROFILE_ENDPOINTS.getProfile + `/${userId}`)
    return res.data
  }
}
