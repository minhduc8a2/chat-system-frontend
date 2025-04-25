enum Token {
  ACCESS_TOKEN = "accessToken",
  REFRESH_TOKEN = "refreshToken",
}

export class TokenStore {
  static storeTokens(accessToken: string | null, refreshToken: string | null) {
    if (accessToken) localStorage.setItem(Token.ACCESS_TOKEN, accessToken)
    if (refreshToken) localStorage.setItem(Token.REFRESH_TOKEN, refreshToken)
  }

  static getAccessToken() {
    return localStorage.getItem(Token.ACCESS_TOKEN)
  }

  static getRefreshToken() {
    return localStorage.getItem(Token.REFRESH_TOKEN)
  }

  static removeTokens() {
    localStorage.removeItem(Token.ACCESS_TOKEN)
    localStorage.removeItem(Token.REFRESH_TOKEN)
  }
}
