import { HeroUIProvider } from "@heroui/react"
import { ReactNode } from "react"
import { ThemeProvider } from "next-themes"
import ErrorModalProvider from "./ErrorModal/ErrorModalProvider"

export default function Provider({ children }: { children: ReactNode }) {
  return (
    <HeroUIProvider>
      <ThemeProvider attribute="class" defaultTheme="dark">
      
        <ErrorModalProvider>{children}</ErrorModalProvider>
      </ThemeProvider>
    </HeroUIProvider>
  )
}
