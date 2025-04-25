import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/react"
import { ReactNode, useState } from "react"
import { ErrorModalContext } from "./ErrorModalContext"

export default function ErrorModalProvider({
  children,
}: {
  children: ReactNode
}) {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure()
  const [message, setMessage] = useState("")
  const [title, setTitle] = useState("Error")

  const showError = (msg: string, customTitle = "Error") => {
    setTitle(customTitle)
    setMessage(msg)
    onOpen()
  }
  return (
    <ErrorModalContext.Provider value={{ showError }}>
      {children}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent>
          {() => (
            <>
              <ModalHeader>{title}</ModalHeader>
              <ModalBody>
                <p>{message}</p>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={onClose}>
                  OK
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </ErrorModalContext.Provider>
  )
}


