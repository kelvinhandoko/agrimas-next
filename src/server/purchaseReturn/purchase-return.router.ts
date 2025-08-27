import { createTRPCRouter } from "@/trpc/trpc";
import { type inferRouterOutputs } from "@trpc/server";

import { createPurchaseReturnController } from "@/server/purchaseReturn/controller/create-purchase-return.controller";
import { getPurchaseReturnController } from "@/server/purchaseReturn/controller/get-purchase-return.controller";

export const purchaseReturnRouter = createTRPCRouter({
  create: createPurchaseReturnController,
  get: getPurchaseReturnController,
});

export type PurchaseReturnRouterOutputs = inferRouterOutputs<
  typeof purchaseReturnRouter
>;
