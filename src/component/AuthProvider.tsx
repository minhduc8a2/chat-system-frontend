import { createContext, ReactNode, useCallback, useMemo, useState } from "react"
import { TokenStore } from "../store/tokenStore"

export interface AuthContextType {
  accessToken: string | null
  refreshToken: string | null
  isAuthenticated: boolean
  login: (tokens: { accessToken: string; refreshToken: string }) => void
  logout: () => void
}

export const AuthContext = createContext<AuthContextType>({
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
})

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken")
  )
  const [refreshToken, setRefreshToken] = useState(
    localStorage.getItem("refreshToken")
  )
  const [isAuthenticated, setIsAuthenticated] = useState(!!accessToken)

  const login = useCallback(
    ({
      accessToken,
      refreshToken,
    }: {
      accessToken: string
      refreshToken: string
    }) => {
      TokenStore.storeTokens(accessToken,refreshToken)
      setAccessToken(accessToken)
      setRefreshToken(refreshToken)
      setIsAuthenticated(true)
    },
    []
  )

  const logout = useCallback(() => {
    TokenStore.removeTokens()
    setAccessToken(null)
    setRefreshToken(null)
    setIsAuthenticated(false)
  }, [])

  const contextValue = useMemo(
    () => ({ accessToken, refreshToken, isAuthenticated, login, logout }),
    [accessToken, refreshToken, isAuthenticated, login, logout]
  )

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}
