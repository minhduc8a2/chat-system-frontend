import { jwtDecode } from "jwt-decode"
import { JwtPayload } from "../model/interface/JwtPayload"

export class JwtUtils {
  static extractUserIdFromToken(token: string | null): JwtPayload | null {
    if (token == null) return null
    try {
      return jwtDecode<JwtPayload>(token)
    } catch (error) {
      console.error("Invalid token:", error)
      return null
    }
  }
}
