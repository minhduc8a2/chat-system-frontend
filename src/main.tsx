import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import Provider from "./component/Provider.tsx"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import MainRoute from "./route/MainRoute.tsx"
import { BrowserRouter } from "react-router"
const queryClient = new QueryClient()
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider>
        <QueryClientProvider client={queryClient}>
          <MainRoute />
        </QueryClientProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>
)
