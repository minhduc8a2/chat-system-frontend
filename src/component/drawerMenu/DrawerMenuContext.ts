import { createContext, useContext } from "react"

export interface DrawerMenuContextType {
  close: () => void
}
export const DrawerMenuContext = createContext<DrawerMenuContextType>({
  close: () => {},
})

export const useDrawerMenuContext = () => {
  const context = useContext(DrawerMenuContext)
  return context
}
