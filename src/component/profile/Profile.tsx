import { useQuery } from "@tanstack/react-query"
import { UserAPI } from "../../api/UserAPI"
import { Avatar, Card, CardBody, CardHeader, Divider } from "@heroui/react"
import { FaUser } from "react-icons/fa6"
import UpdateProfile from "./UpdateProfile"
import { QueryUserKey } from "../../model/enum/QueryUserKey"
import { useAuth } from "../../hook/useAuth"

export default function Profile() {
  const { authInfo } = useAuth()
  const {
    data: userData,
    isLoading,
    error,
  } = useQuery({
    queryKey: [QueryUserKey.PROFILE + authInfo?.userId],
    queryFn: () => UserAPI.getProfile(authInfo!.userId),
  })
  if (isLoading) return <p>Loading...</p>
  if (error) return <p>{error.message}</p>
  return (
    <div className="max-h-screen h-screen overflow-hidden flex justify-center items-center">
      <Card classNames={{ base: "min-w-[500px] p-6 min-h-96" }}>
        <CardHeader className="flex gap-3 justify-between">
          <div className="flex gap-3">
            <Avatar showFallback fallback={<FaUser className="text-xl" />} />
            <h3 className="text-xl">@{authInfo?.sub}</h3>
          </div>
          <UpdateProfile userData={userData!} />
        </CardHeader>
        <Divider />
        <CardBody>
          {Object.entries(userData!.editableObject()).map(([key, value]) => {
            return (
              <div className="" key={key}>
                <p>
                  <span className="capitalize font-semibold">{key}</span> :{" "}
                  {value}
                </p>
              </div>
            )
          })}
        </CardBody>
      </Card>
    </div>
  )
}
