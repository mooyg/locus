import { WebSocketServer } from "ws"

export const initializeWS = () => {
	const wss = new WebSocketServer({
		port: 3001,
	})

	wss.on("connection", (ws) => {
		console.log(`➕➕ Connection (${wss.clients.size})`)
		ws.once("close", () => {
			console.log(`➖➖ Connection (${wss.clients.size})`)
		})
		ws.on("message", async (message) => {
			console.log(message)
		})
	})

	console.log("✅ WebSocket Server listening on ws://localhost:3001")

	process.on("SIGTERM", () => {
		console.log("SIGTERM")
		wss.close()
	})
}
