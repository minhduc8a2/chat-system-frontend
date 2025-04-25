import { createContext } from "react"
import { JwtPayload } from "../../../model/interface/JwtPayload"

export interface AuthContextType {
  authInfo: JwtPayload | null
  accessToken: string | null
  refreshToken: string | null
  isAuthenticated: boolean
  login: (tokens: { accessToken: string; refreshToken: string }) => void
  logout: () => void
}

export const AuthContext = createContext<AuthContextType>({
  authInfo: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
})
