import { createTrpcContext, createTrpcRouter } from "./trpc"

import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify"
import { auth, googleAuth } from "./lucia"
import { env } from "@locus/env"
import { familyRouter } from "./routers/family/_router"
import { userRouter } from "./routers/user/_router"
import Fastify from "fastify"
import FastifyCookie from "@fastify/cookie"
import fastifyIO from "fastify-socket.io"
import cors from "@fastify/cors"
import { Server } from "socket.io"

export const appRouter = createTrpcRouter({
	user: userRouter,
	family: familyRouter,
})

const main = async () => {
	const server = Fastify({})

	server.register(cors, {
		origin: "*",
	})
	server.register(fastifyIO, {
		cors: {
			origin: "*",
		},
	})
	server.register(FastifyCookie, {
		secret: "some-secret",
	})

	server.get("/api/oauth/google", async (_req, res) => {
		const [authorizationUrl, state] = await googleAuth.getAuthorizationUrl()
		res.cookie("github_oauth_state", state, {
			path: "/",
			maxAge: 600000 * 10, // 10 min
			httpOnly: true,
			secure: env.NODE_ENV === "production",
		})
		return res.redirect(authorizationUrl.toString())
	})

	server.get("/api/oauth/google/callback", async (req, res) => {
		const fullUrl = req.protocol + "://" + req.hostname + req.originalUrl
		const url = new URL(fullUrl)
		const code = url.searchParams.get("code")
		if (!code) return res.status(400).send()
		const state = url.searchParams.get("state")
		const storedState = req.cookies["github_oauth_state"]

		if (!state || !storedState || state !== storedState) {
			return res.status(400).send()
		}
		try {
			const { getExistingUser, googleUser, createUser } = await googleAuth.validateCallback(code)
			let user = await getExistingUser()

			if (!user) {
				console.log(googleUser)
				user = await createUser({
					attributes: {
						username: googleUser.name,
						email: "mooybot@gmail.com",
					},
				})
			}
			const session = await auth.createSession({
				userId: user.userId,
				attributes: {},
			})
			return res.redirect(`exp://192.168.2.100:8081/login?session_token=${session.sessionId}`)
		} catch (e) {
			console.log(e)
			return res.status(500).send()
		}
	})

	server.get("/", (_req, res) => {
		res.send("Hello world")
	})

	server.register(fastifyTRPCPlugin, {
		prefix: "/api/trpc",
		trpcOptions: {
			router: appRouter,
			createContext: createTrpcContext,
		},
	})

	await server.listen({
		port: 8000,
	})

	server.ready().then(() => {
		console.log("Listening on http://localhost:8000")
		server.io.on("connection", (socket) => {
			console.log("Socket connected", socket.id)

			socket.on("user-location", (data) => {
				console.log("Received user location pass it on", data)
			})
		})
	})
}
main()
export type AppRouter = typeof appRouter

declare module "fastify" {
	interface FastifyInstance {
		io: Server
	}
}
