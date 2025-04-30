import { HeroUIProvider } from "@heroui/react"
import { ReactNode } from "react"
import { ThemeProvider } from "next-themes"
import { useRouter } from "@tanstack/react-router"
import type { NavigateOptions, ToOptions } from "@tanstack/react-router"
declare module "@react-types/shared" {
  interface RouterConfig {
    href: ToOptions["to"]
    routerOptions: Omit<NavigateOptions, keyof ToOptions>
  }
}

export default function UIProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  return (
    <HeroUIProvider
      navigate={(to, options) => router.navigate({ to, ...options })}
      useHref={(to) => router.buildLocation({ to }).href}
    >
      <ThemeProvider attribute="class" defaultTheme="dark">
        {children}
      </ThemeProvider>
    </HeroUIProvider>
  )
}
