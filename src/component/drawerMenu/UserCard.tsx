import { Avatar, Card, CardHeader } from "@heroui/react"
import { FaUser } from "react-icons/fa6"
import { useAuthContext } from "../auth/authProvider/AuthContext"
import { Link } from "react-router"
import { AppRoute } from "../../model/enum/AppRoutes"
import { useDrawerMenuContext } from "./DrawerMenuContext"
export default function UserCard() {
  const { authInfo } = useAuthContext()
  const { close } = useDrawerMenuContext()
  return (
    <Link to={AppRoute.PROFILE} onClick={close}>
      <Card>
        <CardHeader className="flex gap-3">
          <Avatar showFallback fallback={<FaUser className="text-xl" />} />
          <h3 className="text-xl">@{authInfo?.sub}</h3>
        </CardHeader>
      </Card>
    </Link>
  )
}
