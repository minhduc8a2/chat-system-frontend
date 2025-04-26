import { useEffect, useState } from "react"

export function useLocalStorageState<T>(
  key: string,
  initialValue: T,
  isString: boolean = false
) {
  const [state, setState] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key)
      if (item === null) {
        return initialValue
      }
      if (isString) {
        return item as unknown as T
      }
      return JSON.parse(item) as T
    } catch (error) {
      console.error("❌ Failed to parse localStorage item during init:", error)
      return initialValue
    }
  })

  const setValue = (value: T) => {
    try {
      setState(value)
      if (isString) {
        localStorage.setItem(key, value as unknown as string)
      } else {
        localStorage.setItem(key, JSON.stringify(value))
      }
    } catch (error) {
      console.error("❌ Failed to set localStorage item:", error)
    }
  }

  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key !== key) return

      console.log("storage event", event)
      try {
        if (event.newValue === null) {
          setState(initialValue)
        } else {
          const newValue = isString
            ? (event.newValue as unknown as T)
            : (JSON.parse(event.newValue) as T)
          setState(newValue)
        }
      } catch (error) {
        console.error("❌ Failed to parse localStorage event value:", error)
        setState(initialValue)
      }
    }

    window.addEventListener("storage", handleStorage)
    return () => window.removeEventListener("storage", handleStorage)
  }, [key, initialValue, isString])

  return [state, setValue] as const
}
