import { WebSocket } from 'ws'

export default defineNitroPlugin(() => {
  if (!globalThis.WebSocket) {
    globalThis.WebSocket = WebSocket as typeof globalThis.WebSocket
  }
})
