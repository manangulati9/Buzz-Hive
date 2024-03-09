import { postRouter } from "@/server/api/routers/post";
import { createTRPCRouter } from "@/server/api/trpc";
import { authRouter } from "./routers/auth";
import {
  type inferReactQueryProcedureOptions,
} from '@trpc/react-query';
import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  auth: authRouter,
});

// infer the types for your router
export type ReactQueryOptions = inferReactQueryProcedureOptions<AppRouter>;
export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutputs = inferRouterOutputs<AppRouter>;

// export type definition of API
export type AppRouter = typeof appRouter;
