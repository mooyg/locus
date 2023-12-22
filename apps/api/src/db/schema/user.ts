import { eq, relations } from "drizzle-orm"
import { pgTable, uuid, varchar } from "drizzle-orm/pg-core"
import { family } from "./family"
import { db } from "../index"
import { member } from "./member"

export const user = pgTable("users", {
	id: varchar("id", { length: 15 }).primaryKey(),
	username: varchar("username", { length: 255 }),
	email: varchar("email"),
	familyId: uuid("family_id"),
})

export const userRelations = relations(user, ({ one }) => {
	return {
		family: one(family, {
			fields: [user.familyId],
			references: [family.id],
		}),
	}
})
