import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AuthResponse } from "../../model/domain/AuthResponse"
import { JwtUtils } from "../../util/JwtUtils"
import { TokenStore } from "../tokenStore"
import { AuthState } from "../../model/domain/AuthState"

const initialState: AuthState = {
  authInfo: null,
  isAuthenticated: false,
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<AuthResponse>) => {
      const { accessToken, refreshToken } = action.payload
      state.authInfo = JwtUtils.extractUserFromToken(accessToken)
      state.isAuthenticated = true
      TokenStore.storeTokens(accessToken, refreshToken)
    },
    logout: (state) => {
      state.authInfo = null
      state.isAuthenticated = false
      TokenStore.removeTokens()
    },
  },
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer
