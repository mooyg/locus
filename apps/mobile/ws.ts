import { remember } from "@epic-web/remember";

export const ws = remember("ws", () => new WebSocket("wss://localhost:3001"));
