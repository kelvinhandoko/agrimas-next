import { createTRPCRouter } from "@/trpc/trpc";
import { type inferRouterOutputs } from "@trpc/server";

import { createPaymentMethodController } from "@/server/paymentMethod/controller/create-payment-method.controller";
import { getInfinitePaymentMethodController } from "@/server/paymentMethod/controller/get-infinite-payment-method.controller";

export const paymentMethodRouter = createTRPCRouter({
  create: createPaymentMethodController,
  getInfinite: getInfinitePaymentMethodController,
});

export type PaymentMethodRouterOutputs = inferRouterOutputs<
  typeof paymentMethodRouter
>;
