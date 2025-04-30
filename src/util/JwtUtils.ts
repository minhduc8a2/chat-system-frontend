import { jwtDecode } from "jwt-decode"
import { JwtPayload } from "../model/domain/JwtPayload"

export class JwtUtils {
  static extractUserFromToken(token: string | null): JwtPayload | null {
    if (token == null) return null
    try {
      return jwtDecode<JwtPayload>(token)
    } catch (error) {
      console.error("Invalid token:", error)
      return null
    }
  }
}
