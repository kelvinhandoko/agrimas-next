import { createTRPCRouter } from "@/trpc/trpc";
import { type inferRouterOutputs } from "@trpc/server";

import { createPurchaseInvoiceController } from "@/server/purchaseInvoice/controller/create-purchase-invoice.controller";

export const purchaseInvoiceRouter = createTRPCRouter({
  create: createPurchaseInvoiceController,
});

export type PurchaseInvoiceRouter = inferRouterOutputs<
  typeof purchaseInvoiceRouter
>;
