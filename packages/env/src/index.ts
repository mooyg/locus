import { createEnv } from "@t3-oss/env-core"
import { z } from "zod"
import { config } from "dotenv"
import { resolve } from "path"

console.log("ENVIRONMENT VARIABLES PATH", resolve(__dirname, "../../../.env"))
config({
	path: resolve(__dirname, "../../../.env"),
})

export const env = createEnv({
	server: {
		NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
		DATABASE_URL: z.string(),
		GOOGLE_CLIENT_SECRET: z.string(),
		GOOGLE_CLIENT_ID: z.string(),
		GOOGLE_REDIRECT_URI: z.string(),
	},
	clientPrefix: "PUBLIC",
	runtimeEnv: process.env,
	emptyStringAsUndefined: true,
	client: {},
})
