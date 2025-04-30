import { FormEvent, useState } from "react"
import { Form, Input, Button } from "@heroui/react"

import { useMutation } from "@tanstack/react-query"
import AuthAPI from "../../api/AuthAPI"

import { Link, useNavigate } from "@tanstack/react-router"
import { AppRoute } from "../../model/enum/AppRoutes"
import { useAuth } from "../../hook/useAuth"

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const mutation = useMutation({
    mutationFn: () => AuthAPI.login(username, password),
    onSuccess: (data) => {
      login(data)
      navigate({ to: AppRoute.CHAT.toString() })
    },
    onError: (error) => {
      alert("Login failed: " + error.message)
    },
  })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    mutation.mutate()
  }

  return (
    <div className="flex justify-center items-center pt-24">
      <Form className="w-full max-w-xs " onSubmit={handleSubmit}>
        <h1 className="text-5xl mb-12">Login</h1>
        <Input
          isRequired
          errorMessage="Please enter a valid username"
          label="Username"
          labelPlacement="outside"
          name="username"
          placeholder="Enter your username"
          type="text"
          onValueChange={(value) => {
            setUsername(value)
          }}
        />
        <Input
          isRequired
          errorMessage="Please enter a valid password"
          label="Password"
          labelPlacement="outside"
          name="password"
          placeholder="Enter your password"
          type="password"
          onValueChange={(value) => {
            setPassword(value)
          }}
        />
        <Button
          type="submit"
          variant="bordered"
          className="mt-4"
          isLoading={mutation.isPending}
          isDisabled={mutation.isPending}
        >
          Submit
        </Button>

        <Link
          to={AppRoute.REGISTER.toString()}
          className="text-blue-500 underline mt-4"
        >
          Not have an account?
        </Link>
      </Form>
    </div>
  )
}
