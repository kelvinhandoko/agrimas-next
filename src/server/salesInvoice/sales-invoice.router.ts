import { createTRPCRouter } from "@/trpc/trpc";
import { type inferRouterOutputs } from "@trpc/server";

import { createSalesInvoiceController } from "@/server/salesInvoice/controller/create-sales-invoice.controller";
import { getSalesInvoiceController } from "@/server/salesInvoice/controller/get-sales-invoice.controller";

export const salesInvoiceRouter = createTRPCRouter({
  create: createSalesInvoiceController,
  get: getSalesInvoiceController,
});

export type SalesInvoiceRouterOutput = inferRouterOutputs<
  typeof salesInvoiceRouter
>;
