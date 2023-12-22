import { TRPCError } from "@trpc/server"
import { selectUserWithFamilyMembers } from "../../db/selects/user/selectWithFamilyMembers"
import { ProtectedContext } from "../../trpc"
import { TCreateFamilyInput } from "./create.schema"
import { insertFamily } from "../../db/inserts/family/insert"

type CreateFamilyOptions = {
  ctx: ProtectedContext
  input: TCreateFamilyInput
}

export const createFamilyHandler = async ({ ctx, input }: CreateFamilyOptions) => {
  const userDetails = await selectUserWithFamilyMembers(ctx.user.userId)
  if (!userDetails) {
    throw new TRPCError({
      code: "NOT_FOUND",
    })
  }
  if (userDetails.familyId) {
    throw new TRPCError({
      code: "CONFLICT",
      message: "Already in a family",
    })
  }
  return await insertFamily(input.name, userDetails.id)
}
