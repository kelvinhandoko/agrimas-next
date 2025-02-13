import { customerRouter, errorLogRouter, supplierRouter } from "@/server";
import { createCallerFactory, createTRPCRouter } from "@/trpc/trpc";

import { accountRouter } from "@/server/account";
import { companyRouter } from "@/server/company/company.router";
import { groupAccountRouter } from "@/server/groupAccount/group-account.router";
import { journalRouter } from "@/server/journal";
import { journalDetailRouter } from "@/server/journalDetail/journal-detail.router";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  account: accountRouter,
  groupAccount: groupAccountRouter,
  journal: journalRouter,
  journalDetail: journalDetailRouter,
  company: companyRouter,
  supplier: supplierRouter,
  customer: customerRouter,
  errorLog: errorLogRouter,
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
