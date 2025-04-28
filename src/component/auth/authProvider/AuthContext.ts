import { createContext, useContext } from "react"
import { JwtPayload } from "../../../model/domain/JwtPayload"

export interface AuthContextType {
  authInfo: JwtPayload | null
  
  isAuthenticated: boolean
  login: (tokens: { accessToken: string; refreshToken: string }) => void
  logout: () => void
}

export const AuthContext = createContext<AuthContextType>({
  authInfo: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
})

export const useAuthContext = () => {
  const authContext = useContext(AuthContext)
  return authContext
}
