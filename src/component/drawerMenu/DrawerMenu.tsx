import { useContext, useMemo } from "react"
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
import { MdLogout } from "react-icons/md"
import { AuthContext } from "../auth/authProvider/AuthContext"
import UserCard from "./UserCard"
import { DrawerMenuContext, DrawerMenuContextType } from "./DrawerMenuContext"
export default function DrawerMenu() {
  const { logout, isAuthenticated } = useContext(AuthContext)
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const contextValue = useMemo<DrawerMenuContextType>(
    () => ({ close: onClose }),
    [onClose]
  )
  if (!isAuthenticated) return <></>
  return (
    <DrawerMenuContext.Provider value={contextValue}>
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
          <DrawerBody>
            <UserCard />
          </DrawerBody>
          <DrawerFooter>
            <Button isIconOnly onPress={logout}>
              <MdLogout />
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </DrawerMenuContext.Provider>
  )
}
