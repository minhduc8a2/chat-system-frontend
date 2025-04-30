import { Avatar, Card, CardHeader } from "@heroui/react"
import { FaUser } from "react-icons/fa6"

import { AppRoute } from "../../model/enum/AppRoutes"
import { useDrawerMenuContext } from "./DrawerMenuContext"
import { Link } from "@tanstack/react-router"
import { useAuth } from "../../hook/useAuth"
export default function UserCard() {
  const { authInfo } = useAuth()
  const { close } = useDrawerMenuContext()
  return (
    <Link to={AppRoute.PROFILE.toString()} onClick={close}>
      <Card>
        <CardHeader className="flex gap-3">
          <Avatar showFallback fallback={<FaUser className="text-xl" />} />
          <h3 className="text-xl">@{authInfo?.sub}</h3>
        </CardHeader>
      </Card>
    </Link>
  )
}
