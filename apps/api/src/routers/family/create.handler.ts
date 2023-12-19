import { Context } from "../../trpc"
import { TCreateFamilyInput } from "./create.schema"

type CreateFamilyOptions = {
	ctx: Context
	input: TCreateFamilyInput
}

//TODO: Handle family creation
export const createFamilyHandler = ({ ctx, input }: CreateFamilyOptions) => { }
