import AuthProvider from "../component/auth/authProvider/AuthProvider"
import DrawerMenu from "../component/drawerMenu/DrawerMenu"
import { Route, Routes } from "react-router"
import { AppRoute } from "../model/enum/AppRoutes"
import PrivateRoute from "../component/auth/PrivateRoute"
import App from "../App"
import Chat from "../component/chat/Chat"
import Login from "../component/auth/Login"
import Register from "../component/auth/Register"
import Profile from "../component/profile/Profile"

export default function MainRoute() {
  return (
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
        <Route
          path={AppRoute.PROFILE}
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route path={AppRoute.LOGIN} element={<Login />} />
        <Route path={AppRoute.REGISTER} element={<Register />} />
      </Routes>
    </AuthProvider>
  )
}
