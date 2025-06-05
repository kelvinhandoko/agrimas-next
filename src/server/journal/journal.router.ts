import { createTRPCRouter } from "@/trpc/trpc";
import { type inferRouterOutputs } from "@trpc/server";

import {
  createJournalController,
  getAllJournalController,
} from "@/server/journal/controller";

export const journalRouter = createTRPCRouter({
  create: createJournalController,
  getAll: getAllJournalController,
});

export type JournalRouterOutputs = inferRouterOutputs<typeof journalRouter>;
