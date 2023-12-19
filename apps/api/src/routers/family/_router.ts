import { z } from "zod"
import { createTrpcRouter, protectedProcedure } from "../../trpc"
import { createFamilyHandler } from "./create.handler"
import { ZCreateFamilyInput } from "./create.schema"
const LocationObject = z.object({
	timestamp: z.number(),
	marked: z.boolean().optional(),
	coords: z.object({
		latitude: z.number(),
		longitude: z.number(),
		altitude: z.number().nullish(),
		accuracy: z.number().nullish(),
		altitudeAccuracy: z.number().nullish(),
		heading: z.number().nullish(),
		speed: z.number().nullish(),
	}),
})

export const familyRouter = createTrpcRouter({
	create: protectedProcedure.input(ZCreateFamilyInput).mutation(createFamilyHandler),
})
