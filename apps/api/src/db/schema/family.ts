import { pgTable, uuid, varchar } from "drizzle-orm/pg-core"
import { user } from "./user"
import { relations, sql } from "drizzle-orm"
import { member } from "./member"
export const family = pgTable("family", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`)
    .notNull(),
  name: varchar("name", {
    length: 255,
  }).notNull(),
  adminId: varchar("admin_id", {
    length: 15,
  })
    .references(() => user.id)
    .notNull(),
})

export const familyRelations = relations(family, ({ many }) => {
  return {
    members: many(member),
  }
})
