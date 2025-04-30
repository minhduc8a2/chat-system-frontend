import { JwtPayload } from "./JwtPayload"

export interface AuthState {
  authInfo: JwtPayload | null
  isAuthenticated: boolean
}
