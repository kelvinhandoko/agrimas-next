import { createTRPCRouter } from "@/trpc/trpc";
import { type inferRouterOutputs } from "@trpc/server";

import { createSalesPaymentController } from "@/server/salesPayment/controller/create-sales-payment.controller";
import { getSalesPaymentController } from "@/server/salesPayment/controller/get-sales-payment.controller";

export const salesPaymentRouter = createTRPCRouter({
  create: createSalesPaymentController,
  get: getSalesPaymentController,
});

export type SalesPaymentRouterOutput = inferRouterOutputs<
  typeof salesPaymentRouter
>;
