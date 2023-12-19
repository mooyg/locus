import { env } from "@locus/env"
import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import * as schema from "./schema/schema"

export const queryClient = postgres(env.DATABASE_URL)

export const db = drizzle(queryClient, {
  schema: schema,
  logger: true,
})
