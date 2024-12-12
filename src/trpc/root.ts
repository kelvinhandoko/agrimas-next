import { createCallerFactory, createTRPCRouter } from "@/trpc/trpc";

import { accountRouter } from "@/server/account";
import { groupAccountRouter } from "@/server/groupAccount/group-account.router";
import { journalRouter } from "@/server/journal";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  account: accountRouter,
  groupAccount: groupAccountRouter,
  journal: journalRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
