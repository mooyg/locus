import { type AppRouter } from "@locus/api";

import { createTRPCReact } from "@trpc/react-query";

export const api = createTRPCReact<AppRouter>();
