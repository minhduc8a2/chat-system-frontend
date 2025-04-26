import { TokenType } from "../model/enum/TokenType"
import { useLocalStorageState } from "./useLocalStorageState"

export const useAccessToken = () => {
  const [accessToken, setAccessToken] = useLocalStorageState<string | null>(
    TokenType.ACCESS_TOKEN,
    null,
    true
  )
  return [accessToken, setAccessToken]
}
