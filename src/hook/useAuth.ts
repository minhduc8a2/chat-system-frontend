import { useDispatch } from "react-redux"
import { useAppSelector } from "./reduxHooks"
import { login, logout } from "../store/slice/authSlice"
import { AuthResponse } from "../model/domain/AuthResponse"
export const useAuth = () => {
  const dispatch = useDispatch()
  const authState = useAppSelector((state) => state.auth)

  return {
    login: (tokens: AuthResponse) => dispatch(login(tokens)),
    logout: () => dispatch(logout()),
    ...authState,
  }
}
