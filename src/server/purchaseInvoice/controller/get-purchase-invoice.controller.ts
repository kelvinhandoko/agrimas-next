import { paginatedPurchaseInvoiceQuerySchema } from "@/model/purchase-invoice";
import { companyProcedure } from "@/trpc/trpc";

import { PurchaseInvoiceRepository } from "@/server/purchaseInvoice/purchase-invoice.repository";
import { getPurchaseInvoiceUseCase } from "@/server/purchaseInvoice/use-cases/get-purchase-invoice.use-case";

export const getPurchaseInvoiceController = companyProcedure
  .input(paginatedPurchaseInvoiceQuerySchema)
  .query(async ({ ctx, input }) => {
    const purchaseInvoiceRepo = new PurchaseInvoiceRepository(ctx.db);
    return await getPurchaseInvoiceUseCase(purchaseInvoiceRepo)({
      ...input,
      companyId: ctx.session.user.companyId,
    });
  });
