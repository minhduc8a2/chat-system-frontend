import { HeroUIProvider } from "@heroui/react"
import { ReactNode } from "react"
import { ThemeProvider } from "next-themes"
import ErrorModalProvider from "./ErrorModal/ErrorModalProvider"
import { useHref, useNavigate } from "react-router"
import type {NavigateOptions} from "react-router-dom";
declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NavigateOptions
  }
}
export default function Provider({ children }: { children: ReactNode }) {
  const navigate = useNavigate()

  return (
    <HeroUIProvider navigate={navigate} useHref={useHref}>
      <ThemeProvider attribute="class" defaultTheme="dark">
        <ErrorModalProvider>{children}</ErrorModalProvider>
      </ThemeProvider>
    </HeroUIProvider>
  )
}
