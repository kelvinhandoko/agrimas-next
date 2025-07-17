import { createTRPCRouter } from "@/trpc/trpc";
import { type inferRouterOutputs } from "@trpc/server";

import { createInvoiceReturnController } from "@/server/invoiceReturn/controller/create-invoice-return.controller";

export const invoiceReturnRouter = createTRPCRouter({
  create: createInvoiceReturnController,
});

export type InvoiceReturnRouterOutputs = inferRouterOutputs<
  typeof invoiceReturnRouter
>;
