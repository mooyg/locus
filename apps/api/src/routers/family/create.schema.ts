import { createInsertSchema } from "drizzle-zod"
import { family } from "../../db/schema/family"
import { z } from "zod"

export const ZCreateFamilyInput = createInsertSchema(family).omit({
	id: true,
})

export type TCreateFamilyInput = z.infer<typeof ZCreateFamilyInput>
