import { remember } from "@epic-web/remember"

import { io } from "socket.io-client"

export const socket = remember("socket.io", () =>
	io("http://localhost:8000", {
		autoConnect: false,
	})
)
