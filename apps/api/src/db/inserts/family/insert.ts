import { db } from "../.."
import { family } from "../../schema/family"
import { member } from "../../schema/member"

export const insertFamily = async (name: string, userId: string) => {
	return await db.transaction(async (tx) => {
		const familyData = await tx
			.insert(family)
			.values({
				name,
				adminId: userId,
			})
			.returning()
		await tx.insert(member).values({
			userId,
			isAdmin: true,
			familyId: familyData[0].id,
		})
		return familyData[0]
	})
}
