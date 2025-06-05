import { companyProcedure } from "@/trpc/trpc";
import { z } from "zod";

import { PurchaseInvoiceRepository } from "@/server/purchaseInvoice/purchase-invoice.repository";
import { findDetailPurchaseInvoiceUseCase } from "@/server/purchaseInvoice/use-cases/get-detail-purchase-invoice.use-case";

export const findDetailPurchaseInvoiceController = companyProcedure
  .input(z.string())
  .mutation(async ({ ctx, input }) => {
    const purchaseInvoiceRepo = new PurchaseInvoiceRepository(ctx.db);
    return await findDetailPurchaseInvoiceUseCase(purchaseInvoiceRepo)(input);
  });
