/* eslint-disable @typescript-eslint/no-explicit-any */
export class AuthResponse {
    accessToken: string | null
    refreshToken: string | null
  
    constructor(accessToken: string | null = null, refreshToken: string | null = null) {
      this.accessToken = accessToken
      this.refreshToken = refreshToken
    }
  
    static fromJSON(data: any): AuthResponse {
      return new AuthResponse(
        data?.accessToken ?? null,
        data?.refreshToken ?? null
      )
    }
  }
  