import {  useMemo } from "react"
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

import UserCard from "./UserCard"
import { DrawerMenuContext, DrawerMenuContextType } from "./DrawerMenuContext"
import LinkList from "./LinkList"
import { useAuth } from "../../hook/useAuth"
import { useNavigate } from "@tanstack/react-router"
import { AppRoute } from "../../model/enum/AppRoutes"
export default function DrawerMenu() {
  const { logout, isAuthenticated } = useAuth()
  const navigate = useNavigate()
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
            <div className="mt-12">
              <LinkList />
            </div>
          </DrawerBody>
          <DrawerFooter>
            <Button isIconOnly onPress={()=>{
              logout()
              navigate({to:AppRoute.LOGIN.toString()})
            }}>
              <MdLogout />
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </DrawerMenuContext.Provider>
  )
}
