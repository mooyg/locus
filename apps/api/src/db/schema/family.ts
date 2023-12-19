import { pgTable, uuid, varchar } from "drizzle-orm/pg-core"
import { user } from "./user"
import { relations, sql } from "drizzle-orm"
import { member } from "./member"
import { createInsertSchema } from "drizzle-zod"
export const family = pgTable("family", {
	id: uuid("id")
		.primaryKey()
		.default(sql`gen_random_uuid()`),
	name: varchar("name", {
		length: 255,
	}),
	adminId: varchar("admin_id", {
		length: 15,
	}).references(() => user.id),
})

export const familyRelations = relations(family, ({ many }) => {
	return {
		members: many(member),
	}
})

export const insertFamilySchema = createInsertSchema(family)
