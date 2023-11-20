import { createTrpcRouter, protectedProcedure } from "../trpc";

export const userRouter = createTrpcRouter({
  me: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.user.findUnique({
      where: {
        id: ctx.user.userId,
      },
    });
  }),
});
