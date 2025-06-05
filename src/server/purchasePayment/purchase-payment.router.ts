import { createTRPCRouter } from "@/trpc/trpc";
import { type inferRouterOutputs } from "@trpc/server";

import { createPurchasePaymentController } from "@/server/purchasePayment/controller/create-purchase-payment.controller";
import { getInfinitePurchasePaymentController } from "@/server/purchasePayment/controller/get-infinite-purchase-payment.controller";
import { getPurchasePaymentController } from "@/server/purchasePayment/controller/get-purchase-payment.controller";

export const purchasePaymentRouter = createTRPCRouter({
  create: createPurchasePaymentController,
  get: getPurchasePaymentController,
  getInfinite: getInfinitePurchasePaymentController,
});

export type PurchasePaymentRouter = inferRouterOutputs<
  typeof purchasePaymentRouter
>;
