import { boolean, pgTable, uuid, varchar } from "drizzle-orm/pg-core"
import { user } from "./user"
import { family } from "./family"
import { relations } from "drizzle-orm"

export const member = pgTable("members", {
	userId: varchar("user_id", {
		length: 15,
	}).references(() => user.id),
	familyId: uuid("family_id").references(() => family.id),
	isAdmin: boolean("is_admin"),
})

export const memberRelations = relations(member, ({ one }) => {
	return {
		member: one(family, {
			fields: [member.familyId],
			references: [family.id],
		}),
	}
})
