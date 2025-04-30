import SimpleModalProvider from "./SimpleModal/SimpleModalProvider"
import UIProvider from "./UIProvider"
import DrawerMenu from "./drawerMenu/DrawerMenu"
import { ReactNode } from "react"

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <UIProvider>
      <SimpleModalProvider>
        <DrawerMenu />
        {children}
      </SimpleModalProvider>
    </UIProvider>
  )
}
