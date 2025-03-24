import { createTRPCRouter } from "@/trpc/trpc";
import { type inferRouterOutputs } from "@trpc/server";

import { createPurchaseController } from "@/server/purchase/controller/create-purchase.controller";
import { getAllPurchaseController } from "@/server/purchase/controller/get-all-purchase.controller";

export const purchaseRouter = createTRPCRouter({
  create: createPurchaseController,
  getAll: getAllPurchaseController,
});

export type PurchaseRouterOutputs = inferRouterOutputs<typeof purchaseRouter>;
