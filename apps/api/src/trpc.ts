import { TRPCError, inferAsyncReturnType, initTRPC } from "@trpc/server"
import superjson from "superjson"
import { ZodError } from "zod"
import { auth } from "./lucia"
import { User } from "lucia"
import { db } from "./db"
import { FastifyReply, FastifyRequest } from "fastify"

export type CreateInnerContextOpts = {
	db: typeof db
	req: FastifyRequest
	res: FastifyReply
	user: User | undefined | null
}

export const createInnerTrpcContext = (opts: CreateInnerContextOpts): CreateInnerContextOpts => {
	return {
		db: opts.db,
		req: opts.req,
		res: opts.res,
		user: opts.user,
	} satisfies CreateInnerContextOpts
}
export const createTrpcContext = ({
	req,
	res,
}: {
	req: FastifyRequest
	res: FastifyReply
}): CreateInnerContextOpts => {
	return createInnerTrpcContext({ db, req, res, user: undefined })
}

export type Context = inferAsyncReturnType<typeof createTrpcContext>
export type ProtectedContext = Context & {
	user: User
}
const t = initTRPC.context<Context>().create({
	errorFormatter({ shape, error }) {
		return {
			...shape,
			data: {
				...shape.data,
				zodError: error.cause instanceof ZodError ? error.cause.flatten() : null,
			},
		}
	},
	transformer: superjson,
})

const enforceAuth = t.middleware(async ({ ctx, next }) => {
	const authRequest = auth.handleRequest(ctx.req, ctx.res)
	const session = await authRequest.validateBearerToken()

	if (!session) {
		throw new TRPCError({
			code: "FORBIDDEN",
		})
	}
	return next({
		ctx: {
			...ctx,
			user: session.user,
		},
	})
})

export const createTrpcRouter = t.router
export const publicProcedure = t.procedure
export const protectedProcedure = t.procedure.use(enforceAuth)
