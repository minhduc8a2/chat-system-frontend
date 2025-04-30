import { FormEvent, useState } from "react"
import { Form, Input, Button } from "@heroui/react"
import { useMutation } from "@tanstack/react-query"
import AuthAPI from "../../api/AuthAPI"
import { useAuth } from "../../hook/useAuth"
import { Link, useNavigate } from "@tanstack/react-router"
import { AppRoute } from "../../model/enum/AppRoutes"

export default function Register() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")

  const mutation = useMutation({
    mutationFn: () => AuthAPI.register(username, email, password),
    onSuccess: (data) => {
      login(data)
      navigate({ to: AppRoute.CHAT.toString() })
    },
    onError: (error) => {
      alert("Register failed: " + error.message)
    },
  })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    mutation.mutate()
  }

  return (
    <div className="flex justify-center items-center pt-24">
      <Form className="w-full max-w-xs " onSubmit={handleSubmit}>
        <h1 className="text-5xl mb-12">Register</h1>
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
          errorMessage="Please enter a valid email"
          label="Email"
          labelPlacement="outside"
          name="email"
          placeholder="Enter your email"
          type="email"
          onValueChange={(value) => {
            setEmail(value)
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
          to={AppRoute.LOGIN.toString()}
          className="text-blue-500 underline mt-4"
        >
          Already have an account?
        </Link>
      </Form>
    </div>
  )
}
