import { createTrpcRouter, protectedProcedure } from "../trpc";

export const familyRouter = createTrpcRouter({
  createFamily: protectedProcedure.mutation(async ({ ctx }) => {}),
});
