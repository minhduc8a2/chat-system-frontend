import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { BasicUserInfoDTO } from "../../model/domain/BasicUserInfoDTO"

interface RoomMemberListState {
  roomMemberList: Record<string, BasicUserInfoDTO>
}

const initialState: RoomMemberListState = {
  roomMemberList: {},
}

export const roomMemberListSlice = createSlice({
  name: "roomMemberList",
  initialState,
  reducers: {
    addRoomMemberLists: (state, action: PayloadAction<BasicUserInfoDTO[]>) => {
      const members = action.payload
      members.forEach((member) => {
        state.roomMemberList[member.id] = member
      })
    },
    addRoomMember: (state, action: PayloadAction<BasicUserInfoDTO>) => {
      const member = action.payload
      if (!(member.id in state.roomMemberList)) {
        state.roomMemberList[member.id.toString()] = member
      }
    },
    updateMemberStatus: (
      state,
      action: PayloadAction<{ memberId: string; isOnline: boolean }>
    ) => {
      const { memberId, isOnline } = action.payload
      if (memberId in state.roomMemberList) {
        state.roomMemberList[memberId].isOnline = isOnline
      }
    },
    updateMemberInfo: (state, action: PayloadAction<BasicUserInfoDTO>) => {
      const member = action.payload
      if (member.id in state.roomMemberList) {
        state.roomMemberList[member.id].username = member.username
      }
    },
  },
})

export const {
  addRoomMemberLists,
  updateMemberStatus,
  addRoomMember,
  updateMemberInfo,
} = roomMemberListSlice.actions

export default roomMemberListSlice.reducer
