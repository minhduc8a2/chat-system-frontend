import { useContext } from "react"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  useDisclosure,
} from "@heroui/react"
import { HiOutlineMenu } from "react-icons/hi"
import { AuthContext } from "./auth/authProvider/AuthContext"
import { MdLogout } from "react-icons/md"
export default function DrawerMenu() {
  const { logout, isAuthenticated } = useContext(AuthContext)
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  if (!isAuthenticated) return <></>
  return (
    <>
      <Button
        isIconOnly
        onPress={() => onOpen()}
        className="fixed top-6 left-12"
      >
        <HiOutlineMenu className="text-xl" />
      </Button>
      <Drawer isOpen={isOpen} placement="left" onOpenChange={onOpenChange}>
        <DrawerContent>
          <DrawerHeader className="flex flex-col gap-1"></DrawerHeader>
          <DrawerBody></DrawerBody>
          <DrawerFooter>
            <Button isIconOnly onPress={logout}>
              <MdLogout />
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}
