import postgres from "postgres"
import { migrate } from "drizzle-orm/postgres-js/migrator"
import { env } from "@locus/env"
import { drizzle } from "drizzle-orm/postgres-js"
import { join } from "node:path"

const migrationsClient = postgres(env.DATABASE_URL, {
	max: 1,
})
const db = drizzle(migrationsClient)

migrate(db, {
	migrationsFolder: join(__dirname, "../../drizzle"),
})
	.then(() => {
		console.log("Done")
		process.exit(0)
	})
	.catch((e) => {
		console.log(__dirname)
		console.error(e, "Some error occured")
		process.exit(1)
	})
