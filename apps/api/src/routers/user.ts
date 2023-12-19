import { sql } from "drizzle-orm"
import { user } from "../db/schema/user"
import { createTrpcRouter, protectedProcedure } from "../trpc"

export const userRouter = createTrpcRouter({
	me: protectedProcedure.query(async ({ ctx }) => {
		return await ctx.db
			.select()
			.from(user)
			.where(sql`${user.id} = ${ctx.user.userId}`)
	}),
})
