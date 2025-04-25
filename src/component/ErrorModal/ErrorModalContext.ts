import { createContext, useContext } from "react"

type ErrorModalContextType = {
  showError: (message: string, title?: string) => void
}

export const ErrorModalContext = createContext<
  ErrorModalContextType | undefined
>(undefined)

export const useErrorModal = (): ErrorModalContextType => {
  const ctx = useContext(ErrorModalContext)
  if (!ctx) {
    throw new Error("useErrorModal must be used inside <ErrorModalProvider>")
  }
  return ctx
}
