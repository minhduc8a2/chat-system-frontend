// src/utils/HttpErrorHandler.ts
import axios from "axios"
import { useSimpleModal } from "../component/SimpleModal/SimpleModalContext"

export function useHttpErrorHandler() {
  const { showSimpleModal } = useSimpleModal()

  const handle = (error: Error, customMessages?: Record<number, string>) => {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status
      const defaultMsg = "An unexpected error occurred."

      const msg =
        (status && customMessages?.[status]) ||
        (status && defaultMessages[status]) ||
        defaultMsg

      showSimpleModal(msg, `Error ${status ?? ""}`)
    } else {
      showSimpleModal(error.message, "Unexpected Error")
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
