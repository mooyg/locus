import { selectUserWithFamilyMembers } from "../../db/selects/user/selectWithFamilyMembers"
import { ProtectedContext } from "../../trpc"

type GetUserOptions = {
  ctx: ProtectedContext
}

export const getUserHandler = async ({ ctx }: GetUserOptions) => {
  return await selectUserWithFamilyMembers(ctx.user.userId)
}
