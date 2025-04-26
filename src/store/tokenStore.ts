import { TokenType } from "../model/enum/TokenType"

export class TokenStore {
  static storeTokens(accessToken: string | null, refreshToken: string | null) {
    if (accessToken) localStorage.setItem(TokenType.ACCESS_TOKEN, accessToken)
    if (refreshToken) localStorage.setItem(TokenType.REFRESH_TOKEN, refreshToken)
  }

  static getAccessToken() {
    return localStorage.getItem(TokenType.ACCESS_TOKEN)
  }

  static getRefreshToken() {
    return localStorage.getItem(TokenType.REFRESH_TOKEN)
  }

  static removeTokens() {
    localStorage.removeItem(TokenType.ACCESS_TOKEN)
    localStorage.removeItem(TokenType.REFRESH_TOKEN)
  }
}


