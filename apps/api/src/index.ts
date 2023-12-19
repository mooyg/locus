import { createTrpcContext, createTrpcRouter } from "./trpc"
import * as trpcExpress from "@trpc/server/adapters/express"
import express from "express"
import { auth, googleAuth } from "./lucia"
import { env } from "@locus/env"
import cookieParser from "cookie-parser"
import { userRouter } from "./routers/user"
import { initializeWS } from "./wssDevServer"
import { familyRouter } from "./routers/family/_router"

export const appRouter = createTrpcRouter({
	user: userRouter,
	family: familyRouter,
})

const app = express()

app.use(express.urlencoded()) // for application/x-www-form-urlencoded (forms)
app.use(express.json()) // for application/json
app.use(cookieParser())

app.get("/api/oauth/google", async (_req, res) => {
	const [authorizationUrl, state] = await googleAuth.getAuthorizationUrl()
	res.cookie("github_oauth_state", state, {
		path: "/",
		maxAge: 600000 * 10, // 10 min
		httpOnly: true,
		secure: env.NODE_ENV === "production",
	})
	return res.redirect(authorizationUrl.toString())
})

app.get("/api/oauth/google/callback", async (req, res) => {
	const fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl
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

app.get("/", (_req, res) => {
	res.send("Hello world")
})

app.use(
	"/trpc",
	trpcExpress.createExpressMiddleware({
		router: appRouter,
		createContext: createTrpcContext,
	})
)

app.listen(8000, () => {
	console.log("Server live on http://localhost:8000")
	initializeWS()
})

export type AppRouter = typeof appRouter
