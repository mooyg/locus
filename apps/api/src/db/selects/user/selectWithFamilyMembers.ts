import { eq } from "drizzle-orm"
import { db } from "../.."
import { user } from "../../schema/user"

export const selectUserWithFamilyMembers = async (id: string) => {
	const userDetails = await db.query.user.findFirst({
		where: eq(user.id, id),
		with: {
			family: {
				with: {
					members: true,
				},
			},
		},
	})
	console.log(userDetails)
	return userDetails
}
