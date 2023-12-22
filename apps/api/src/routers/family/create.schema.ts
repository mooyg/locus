import { createInsertSchema } from "drizzle-zod"
import { family } from "../../db/schema/family"
import { z } from "zod"

export const CreateFamilySchema = createInsertSchema(family)
export const ZCreateFamilyInput = CreateFamilySchema.omit({
  id: true,
  adminId: true,
})

export type TCreateFamilyInput = z.infer<typeof ZCreateFamilyInput>
