import { createContext, ReactNode, useCallback, useMemo, useState } from "react"

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
      localStorage.setItem("accessToken", accessToken)
      localStorage.setItem("refreshToken", refreshToken)
      setAccessToken(accessToken)
      setRefreshToken(refreshToken)
      setIsAuthenticated(true)
    },
    []
  )

  const logout = useCallback(() => {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
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
