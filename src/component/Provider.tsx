import { HeroUIProvider } from "@heroui/react"
import  { ReactNode } from "react"

export default function Provider({ children }:{children:ReactNode}) {
  return (
    <HeroUIProvider>
      <main className="dark text-foreground bg-background min-h-screen">{children}</main>
    </HeroUIProvider>
  )
}
