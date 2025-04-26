import { useQuery } from "@tanstack/react-query"
import React from "react"
import { useAuthContext } from "../auth/authProvider/AuthContext"
import { UserAPI } from "../../api/UserAPI"

export default function Profile() {
  const { authInfo } = useAuthContext()
  const { data, isLoading, error } = useQuery({
    queryKey: ["users", "profile", authInfo?.userId],
    queryFn: () => UserAPI.getProfile(authInfo!.userId),
  })
  if (isLoading) return <p>Loading...</p>
  if (error) return <p>{error.message}</p>
  return <div>{data?.email}</div>
}
