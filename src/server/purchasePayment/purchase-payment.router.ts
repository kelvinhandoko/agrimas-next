import { createTRPCRouter } from "@/trpc/trpc";
import { type inferRouterOutputs } from "@trpc/server";

import { createPurchasePaymentController } from "@/server/purchasePayment/controller/create-purchase.controller";

export const purchasePaymentRouter = createTRPCRouter({
  create: createPurchasePaymentController,
});

export type PurchasePaymentRouter = inferRouterOutputs<
  typeof purchasePaymentRouter
>;
