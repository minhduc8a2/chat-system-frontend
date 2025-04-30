import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import { store } from "./store/reduxStore.ts"
import { Provider as ReduxStoreProvider } from "react-redux"

// Import the generated route tree

import { createRouter, RouterProvider } from "@tanstack/react-router"
import { routeTree } from "./routes/__root.tsx"

// Create a new router instance
const router = createRouter({ routeTree })

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}

const queryClient = new QueryClient()
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReduxStoreProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ReduxStoreProvider>
  </StrictMode>
)
