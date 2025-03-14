import { createTRPCRouter } from "@/trpc/trpc";
import { type inferRouterOutputs } from "@trpc/server";

import { createPurchaseController } from "@/server/purchase/controller/create-purchase.controller";

export const purchaseRouter = createTRPCRouter({
  create: createPurchaseController,
});

export type PurchaseRouterOutputs = inferRouterOutputs<typeof purchaseRouter>;
