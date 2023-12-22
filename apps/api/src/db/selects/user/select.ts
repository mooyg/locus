import { eq } from "drizzle-orm"
import { db } from "../.."
import { user } from "../../schema/user"

export const selectUser = async (id: string) => {
	return await db.select().from(user).where(eq(user.id, id))
}
