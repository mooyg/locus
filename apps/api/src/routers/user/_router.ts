import { createTrpcRouter, protectedProcedure } from "../../trpc"
import { getUserHandler } from "./get.handler"

export const userRouter = createTrpcRouter({
  get: protectedProcedure.query(getUserHandler),
})
