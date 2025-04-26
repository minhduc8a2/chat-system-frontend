import axios from "axios"
import { API_GATEWAY_URL } from "./apiEndpoints"
import { TokenStore } from "../store/tokenStore"
import { AuthResponse } from "../model/domain/AuthResponse"
export const AUTH_SERVICE_URL = `${API_GATEWAY_URL}/api/v1/auth`

export const AUTH_ENDPOINTS = {
  login: `${AUTH_SERVICE_URL}/login`,
  register: `${AUTH_SERVICE_URL}/register`,
  refresh: `${AUTH_SERVICE_URL}/refresh`,
}

class AuthAPI {
  static async login(username: string, password: string) {
    const res = await axios.post(AUTH_ENDPOINTS.login, { username, password })
    const data = res.data
    if (res.status !== 200) {
      throw new Error(data.message ?? "Login failed")
    }
    return data
  }

  static async register(username: string, email: string, password: string) {
    const res = await axios.post(AUTH_ENDPOINTS.register, {
      username,
      email,
      password,
    })
    const data = res.data
    if (res.status !== 200) {
      throw new Error(data.message ?? "Register failed")
    }
    return data
  }

  static async refreshToken(): Promise<AuthResponse | null> {
    try {
      const refreshToken = TokenStore.getRefreshToken()
      if (!refreshToken) return null
      const response = await axios.post(AUTH_ENDPOINTS.refresh, {
        refreshToken,
      })
      return response.data
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new Error("Failed to refresh token")
    }
  }
}

export default AuthAPI
