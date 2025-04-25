/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios"
import { TokenStore } from "../store/tokenStore"
import { AUTH_ENDPOINTS } from "../api/AuthAPI"

const api = axios.create()

api.interceptors.request.use((config) => {
  const accessToken = TokenStore.getAccessToken()
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  return config
})



let isRefreshing = false
let failedQueue: any[] = []

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error)
    else prom.resolve(token)
  })
  failedQueue = []
}

api.interceptors.response.use(undefined, async (error) => {
  const originalRequest = error.config
  if (error.response?.status === 401 && !originalRequest._retry) {
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject })
      }).then((token) => {
        originalRequest.headers.Authorization = "Bearer " + token
        return api(originalRequest)
      })
    }

    originalRequest._retry = true
    isRefreshing = true

    try {
      const refreshToken = TokenStore.getRefreshToken()
      const response = await axios.post(AUTH_ENDPOINTS.refresh, {
        refreshToken,
      })
      const { accessToken, refreshToken: newRefresh } = response.data

      TokenStore.storeTokens(accessToken, newRefresh)
      api.defaults.headers.common["Authorization"] = "Bearer " + accessToken
      processQueue(null, accessToken)

      return api(originalRequest)
    } catch (err) {
      processQueue(err, null)
      // Handle logout logic
      TokenStore.removeTokens()
      window.location.href = "/login"
      return Promise.reject(err)
    } finally {
      isRefreshing = false
    }
  }

  return Promise.reject(error)
})

export default api
