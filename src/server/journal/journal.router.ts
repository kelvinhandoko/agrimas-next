import { createTRPCRouter } from "@/trpc/trpc";
import { type inferRouterOutputs } from "@trpc/server";

import {
  createJournalController,
  getAllJournalController,
} from "@/server/journal/controller";
import { getInfiniteJournalController } from "@/server/journal/controller/get-infinite-journal.controller";

export const journalRouter = createTRPCRouter({
  create: createJournalController,
  get: getAllJournalController,
  getInfinite: getInfiniteJournalController,
});

export type JournalRouterOutputs = inferRouterOutputs<typeof journalRouter>;
