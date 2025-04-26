import { Listbox, ListboxItem } from "@heroui/react"
import { AppRoute } from "../../model/enum/AppRoutes"
import { useDrawerMenuContext } from "./DrawerMenuContext"

export default function LinkList() {
  const { close } = useDrawerMenuContext()
  return (
    <Listbox aria-label="Dynamic Actions" onAction={close}>
      <ListboxItem key="home" href={AppRoute.HOME}>
        Home
      </ListboxItem>
      <ListboxItem key="chat" href={AppRoute.CHAT}>
        Chat
      </ListboxItem>
    </Listbox>
  )
}
