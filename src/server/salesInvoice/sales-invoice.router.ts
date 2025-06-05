import { createTRPCRouter } from "@/trpc/trpc";
import { type inferRouterOutputs } from "@trpc/server";

import { createSalesInvoiceController } from "@/server/salesInvoice/controller/create-sales-invoice.controller";
import { getDetailSalesInvoiceController } from "@/server/salesInvoice/controller/get-detail-sales-invoice.controller";
import { getInfiniteSalesInvoiceController } from "@/server/salesInvoice/controller/get-infinite-sales-invoice.controller";
import { getSalesInvoiceController } from "@/server/salesInvoice/controller/get-sales-invoice.controller";

export const salesInvoiceRouter = createTRPCRouter({
  create: createSalesInvoiceController,
  get: getSalesInvoiceController,
  getInfinite: getInfiniteSalesInvoiceController,
  getDetail: getDetailSalesInvoiceController,
});

export type SalesInvoiceRouterOutput = inferRouterOutputs<
  typeof salesInvoiceRouter
>;
