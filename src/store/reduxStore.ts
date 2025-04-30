import { configureStore } from "@reduxjs/toolkit"
import roomMemberListReducer from "./slice/roomMemberListSlice"
import authReducer from "./slice/authSlice"
import { TokenStore } from "./tokenStore"
import { JwtUtils } from "../util/JwtUtils"
const preloadedState = {
  auth: {
    isAuthenticated: !!TokenStore.getAccessToken(),
    authInfo: JwtUtils.extractUserFromToken(TokenStore.getAccessToken()),
  },
}
export const store = configureStore({
  reducer: {
    roomMemberList: roomMemberListReducer,
    auth: authReducer,
  },
  preloadedState,
})

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store
