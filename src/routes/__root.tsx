import {
  createRootRoute,
  createRoute,
  Outlet,
  redirect,
} from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools"
import AppLayout from "../component/AppLayout"
import Home from "../component/Home"
import Login from "../component/auth/Login"
import { store } from "../store/reduxStore"
import Chat from "../component/chat/Chat"
import { AppRoute } from "../model/enum/AppRoutes"
export const rootRoute = createRootRoute({
  component: () => (
    <>
      <AppLayout>
        <Outlet />
      </AppLayout>
      <TanStackRouterDevtools />
    </>
  ),
})

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: AppRoute.HOME,
  component: Home,
  beforeLoad: checkAuth,
})

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: AppRoute.LOGIN,
  component: Login,
  beforeLoad: () => {
    const state = store.getState()
    const isAuthenticated = state.auth.isAuthenticated

    if (isAuthenticated) {
      throw redirect({ to: AppRoute.HOME.toString() })
    }
  },
})

const chatRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: AppRoute.CHAT,
  component: Chat,
})

export const chatRoomRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: AppRoute.CHAT+"/$id",
  component: Chat,
})

function checkAuth() {
  const state = store.getState()
  const isAuthenticated = state.auth.isAuthenticated

  if (!isAuthenticated) {
    throw redirect({ to: AppRoute.LOGIN.toString() })
  }
}

export const routeTree = rootRoute.addChildren([
  homeRoute,
  profileRoute,
  chatRoute,
  chatRoomRoute,
])
