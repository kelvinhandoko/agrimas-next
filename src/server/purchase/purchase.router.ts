import { createTRPCRouter } from "@/trpc/trpc";
import { type inferRouterOutputs } from "@trpc/server";

import { createPurchaseController } from "@/server/purchase/controller/create-purchase.controller";
import { getAllPurchaseController } from "@/server/purchase/controller/get-all-purchase.controller";
import { getInfinitePurchaseController } from "@/server/purchase/controller/get-infinite-purchase.controller";

export const purchaseRouter = createTRPCRouter({
  create: createPurchaseController,
  getAll: getAllPurchaseController,
  getInfinite: getInfinitePurchaseController,
});

export type PurchaseRouterOutputs = inferRouterOutputs<typeof purchaseRouter>;
