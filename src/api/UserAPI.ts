import { UserProfile, UserProfileEditable } from "../model/domain/UserProfile"
import api from "../util/requester"
import { API_GATEWAY_URL } from "./apiEndpoints"

export const USER_SERVICE_URL = `${API_GATEWAY_URL}/api/v1/users`
export const USER_PROFILE_ENDPOINTS = {
  getProfile: `${USER_SERVICE_URL}`,
  updateProfile: `${USER_SERVICE_URL}`,
}

export class UserAPI {
  static async getProfile(userId: number): Promise<UserProfile> {
    const res = await api.get(USER_PROFILE_ENDPOINTS.getProfile + `/${userId}`)
    return UserProfile.fromJson(res.data)
  }

  static async updateProfile(
    userId: number,
    data: UserProfileEditable
  ): Promise<UserProfile> {
    const res = await api.patch(
      USER_PROFILE_ENDPOINTS.updateProfile + `/${userId}`,
      data
    )
    return UserProfile.fromJson(res.data)
  }
}
