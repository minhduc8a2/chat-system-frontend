import { useAppSelector } from "./reduxHooks"

export const useRoomMemberList = () => {
  const roomMemberList = useAppSelector(
    (state) => state.roomMemberList.roomMemberList
  )
  return { roomMemberList }
}
