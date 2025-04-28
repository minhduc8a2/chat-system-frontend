export const CHAT_ENDPOINTS = {
  websocket: "ws://localhost:8084/ws",
  sendToChatRoom: "/app/chat.send",
  receiveFromChatRoom: "/topic/chat_room",
  heartbeat: "/app/heartbeat",
  heartbeatReply: "/user/queue/heartbeatReply",
  publicPresence: "/topic/presence",
}

export const API_GATEWAY_URL = "http://localhost:8083"
