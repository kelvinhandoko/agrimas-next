import { createTRPCRouter } from "@/trpc/trpc";
import { type inferRouterOutputs } from "@trpc/server";

import { getInfinitePurchasedProductController } from "@/server/purchasedProduct/controller/get-infinite-purchase-product.controller";

export const purchasedProductRouter = createTRPCRouter({
  getInfinite: getInfinitePurchasedProductController,
});

export type PurchasedProductRouter = inferRouterOutputs<
  typeof purchasedProductRouter
>;
