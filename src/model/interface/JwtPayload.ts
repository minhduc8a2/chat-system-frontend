/* eslint-disable @typescript-eslint/no-explicit-any */
export interface JwtPayload {
  sub: string
  userId: number
  roles: string[]
  exp: number
  iat: number
  [key: string]: any
}