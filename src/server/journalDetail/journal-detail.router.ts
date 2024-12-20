import { createTRPCRouter } from "@/trpc/trpc";
import { type inferRouterOutputs } from "@trpc/server";

import { getAllJournalDetailByAccountIdController } from "@/server/journalDetail/controller";

export const journalDetailRouter = createTRPCRouter({
  getAllByAccountId: getAllJournalDetailByAccountIdController,
});

export type JournalDetailRouterOutputs = inferRouterOutputs<
  typeof journalDetailRouter
>;
