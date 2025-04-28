import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import Provider from "./component/Provider.tsx"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import MainRoute from "./route/MainRoute.tsx"
import { BrowserRouter } from "react-router"

import {store} from "./store/reduxStore.ts"
import { Provider as ReduxStoreProvider } from "react-redux"
const queryClient = new QueryClient()
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReduxStoreProvider store={store}>
      <BrowserRouter>
        <Provider>
          <QueryClientProvider client={queryClient}>
            <MainRoute />
          </QueryClientProvider>
        </Provider>
      </BrowserRouter>
    </ReduxStoreProvider>
  </StrictMode>
)
