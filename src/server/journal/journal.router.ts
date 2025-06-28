import { createTRPCRouter } from "@/trpc/trpc";
import { type inferRouterOutputs } from "@trpc/server";

import {
  createJournalController,
  getPaginatedJournalController,
} from "@/server/journal/controller";

export const journalRouter = createTRPCRouter({
  create: createJournalController,
  get: getPaginatedJournalController,
});

export type JournalRouterOutputs = inferRouterOutputs<typeof journalRouter>;
