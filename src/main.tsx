import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.tsx"
import Provider from "./component/Provider.tsx"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Route, Routes } from "react-router"
import AuthProvider from "./component/auth/authProvider/AuthProvider.tsx"
import Login from "./component/auth/Login.tsx"
import PrivateRoute from "./component/auth/PrivateRoute.tsx"
import Chat from "./component/chat/Chat.tsx"
import Register from "./component/auth/Register.tsx"
import DrawerMenu from "./component/drawerMenu/DrawerMenu.tsx"
import { AppRoute } from "./model/enum/AppRoutes.ts"
const queryClient = new QueryClient()
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AuthProvider>
            <DrawerMenu />
            <Routes>
              <Route
                path={AppRoute.HOME}
                element={
                  <PrivateRoute>
                    <App />
                  </PrivateRoute>
                }
              />
              <Route
                path={AppRoute.CHAT}
                element={
                  <PrivateRoute>
                    <Chat />
                  </PrivateRoute>
                }
              />
              <Route path={AppRoute.LOGIN} element={<Login />} />
              <Route path={AppRoute.REGISTER} element={<Register />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  </StrictMode>
)
