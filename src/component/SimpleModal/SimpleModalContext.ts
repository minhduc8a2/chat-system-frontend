import { createContext, useContext } from "react"

type SimpleModalContextType = {
  showSimpleModal: (message: string, title?: string) => void
}

export const SimpleModalContext = createContext<
  SimpleModalContextType | undefined
>(undefined)

export const useSimpleModal = (): SimpleModalContextType => {
  const ctx = useContext(SimpleModalContext)
  if (!ctx) {
    throw new Error("useSimpleModal must be used inside <SimpleModalProvider>")
  }
  return ctx
}
