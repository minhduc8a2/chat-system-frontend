import { HeroUIProvider } from "@heroui/react"
import { ReactNode } from "react"
import { ThemeProvider } from 'next-themes'
export default function Provider({ children }: { children: ReactNode }) {
  return (
    <HeroUIProvider>
      <ThemeProvider attribute="class" defaultTheme="dark">{children}</ThemeProvider>
    </HeroUIProvider>
  )
}
