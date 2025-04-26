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
import { SimpleModalContext } from "./SimpleModalContext"

export default function SimpleModalProvider({
  children,
}: {
  children: ReactNode
}) {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure()
  const [message, setMessage] = useState("")
  const [title, setTitle] = useState("Info")

  const showSimpleModal = (msg: string, customTitle = "Info") => {
    setTitle(customTitle)
    setMessage(msg)
    onOpen()
  }
  return (
    <SimpleModalContext.Provider value={{ showSimpleModal }}>
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
    </SimpleModalContext.Provider>
  )
}


