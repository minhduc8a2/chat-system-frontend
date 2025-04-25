import { FormEvent, useContext, useState } from "react"
import { Form, Input, Button } from "@heroui/react"
import { Link, useNavigate } from "react-router"
import { useMutation } from "@tanstack/react-query"
import { AuthContext, AuthContextType } from "./AuthProvider"
import AuthAPI from "../api/AuthAPI"

export default function Register() {
  const { login } = useContext<AuthContextType>(AuthContext)
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")

  const mutation = useMutation({
    mutationFn: () => AuthAPI.register(username, email, password),
    onSuccess: (data) => {
      login(data)
      navigate("/chat")
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
        <Button type="submit" variant="bordered" className="mt-4">
          Submit
        </Button>
        <Link to="/login" className="text-blue-500 underline mt-4">
          Already have an account?
        </Link>
      </Form>
    </div>
  )
}
