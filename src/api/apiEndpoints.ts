export const CHAT_ENDPOINTS = {
  websocket: "ws://localhost:8084/ws",
  sendToChatRoom: "/app/chat.send",
  receiveFromChatRoom: "/topic/chat_room",
  heartbeat: "/app/heartbeat",
  heartbeatReply: "/user/queue/heartbeatReply",
  publicPresence: "/topic/presence",
  roomCommandBuilder: (roomId: number) => "/topic/chat_room/" + roomId + "/commands",
  unsubcribeBuilder: (roomId: number) => "/app/unsubcribe/chat_rooms/" + roomId,
}

export const API_GATEWAY_URL = "http://localhost:8083"
