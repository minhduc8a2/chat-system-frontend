import {  ReactNode, useCallback, useMemo, useState } from "react"
import { TokenStore } from "../../../store/tokenStore"
import { JwtPayload } from "../../../model/interface/JwtPayload"
import { JwtUtils } from "../../../util/JwtUtils"
import { AuthContext } from "./AuthContext"



export default function AuthProvider({ children }: { children: ReactNode }) {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken")
  )
  const [refreshToken, setRefreshToken] = useState(
    localStorage.getItem("refreshToken")
  )
  const isAuthenticated = useMemo<boolean>(() => !!accessToken, [accessToken])

  const authInfo = useMemo<JwtPayload|null>(()=>JwtUtils.extractUserIdFromToken(accessToken),[accessToken])

  const login = useCallback(
    ({
      accessToken,
      refreshToken,
    }: {
      accessToken: string
      refreshToken: string
    }) => {
      TokenStore.storeTokens(accessToken, refreshToken)
      setAccessToken(accessToken)
      setRefreshToken(refreshToken)
      
    },
    []
  )

  const logout = useCallback(() => {
    TokenStore.removeTokens()
    setAccessToken(null)
    setRefreshToken(null)
    
  }, [])

  const contextValue = useMemo(
    () => ({
      accessToken,
      refreshToken,
      isAuthenticated,
      login,
      logout,
      authInfo,
    }),
    [accessToken, refreshToken, isAuthenticated, login, logout, authInfo]
  )

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}
