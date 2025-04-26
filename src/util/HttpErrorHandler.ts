// src/utils/HttpErrorHandler.ts
import axios from "axios"
import { useErrorModal } from "../component/ErrorModal/ErrorModalContext"

export function useHttpErrorHandler() {
  const { showError } = useErrorModal()

  const handle = (error: Error, customMessages?: Record<number, string>) => {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status
      const defaultMsg = "An unexpected error occurred."

      const msg =
        (status && customMessages?.[status]) ||
        (status && defaultMessages[status]) ||
        defaultMsg

      showError(msg, `Error ${status ?? ""}`)
    } else {
      showError(error.message, "Unexpected Error")
    }
  }

  return { handle }
}

const defaultMessages: Record<number, string> = {
  400: "Bad request",
  401: "You must be logged in",
  403: "You are not authorized",
  404: "Resource not found",
  500: "Server error. Please try again later.",
}
