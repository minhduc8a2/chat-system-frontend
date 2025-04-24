export const loginUser = async (username: string, password: string) => {
  const res = await fetch("http://localhost:8083/api/v1/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message || "Login failed")
  return data
}
