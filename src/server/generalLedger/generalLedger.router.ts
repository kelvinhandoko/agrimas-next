import { createTRPCRouter } from "@/trpc/trpc";
import { type inferRouterOutputs } from "@trpc/server";

import { getGeneralLedgerController } from "@/server/generalLedger/controller/get-general-ledger.controller";

export const generalLedgerRouter = createTRPCRouter({
  get: getGeneralLedgerController,
});

export type GeneralLedgerRouterOutputs = inferRouterOutputs<
  typeof generalLedgerRouter
>;
