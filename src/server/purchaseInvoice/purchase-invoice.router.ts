import { createTRPCRouter } from "@/trpc/trpc";
import { type inferRouterOutputs } from "@trpc/server";

import { getInfinitePurchaseController } from "@/server/purchase/controller/get-infinite-purchase.controller";
import { createPurchaseInvoiceController } from "@/server/purchaseInvoice/controller/create-purchase-invoice.controller";
import { findDetailPurchaseInvoiceController } from "@/server/purchaseInvoice/controller/find-detail-purchase-invoice.controller";
import { getPurchaseInvoiceController } from "@/server/purchaseInvoice/controller/get-purchase-invoice.controller";

export const purchaseInvoiceRouter = createTRPCRouter({
  create: createPurchaseInvoiceController,
  get: getPurchaseInvoiceController,
  getInfinite: getInfinitePurchaseController,
  findDetail: findDetailPurchaseInvoiceController,
});

export type PurchaseInvoiceRouter = inferRouterOutputs<
  typeof purchaseInvoiceRouter
>;
