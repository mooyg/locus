import { lucia } from "lucia"
import { env } from "@locus/env"
import { express } from "lucia/middleware"
import { google } from "@lucia-auth/oauth/providers"
import { postgres as postgresAdapter } from "@lucia-auth/adapter-postgresql"
import { queryClient } from "./db"

export const auth = lucia({
  env: env.NODE_ENV === "development" ? "DEV" : "PROD",
  middleware: express(),
  adapter: postgresAdapter(queryClient, {
    user: "user",
    session: "user_session",
    key: "user_key",
  }),
  getUserAttributes: (userData: { username: string; email: string }) => {
    return {
      username: userData.username,
      email: userData.email,
    }
  },
})

export const googleAuth = google(auth, {
  clientId: env.GOOGLE_CLIENT_ID,
  clientSecret: env.GOOGLE_CLIENT_SECRET,
  redirectUri: env.GOOGLE_REDIRECT_URI,
  scope: ["profile", "email"],
})
export type Auth = typeof auth
