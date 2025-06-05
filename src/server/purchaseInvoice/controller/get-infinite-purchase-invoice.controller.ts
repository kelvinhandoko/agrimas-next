import { cursorPurchaseInvoiceQuerySchema } from "@/model/purchase-invoice";
import { companyProcedure } from "@/trpc/trpc";

import { PurchaseInvoiceRepository } from "@/server/purchaseInvoice/purchase-invoice.repository";
import { getInfinitePurchaseInvoiceUseCase } from "@/server/purchaseInvoice/use-cases/get-infinite-purchase-invoice.use-case";

export const getInfinitePurchaseInvoiceController = companyProcedure
  .input(cursorPurchaseInvoiceQuerySchema)
  .query(async ({ ctx, input }) => {
    const purchaseInvoiceRepo = new PurchaseInvoiceRepository(ctx.db);
    return await getInfinitePurchaseInvoiceUseCase(purchaseInvoiceRepo)({
      ...input,
      companyId: ctx.session.user.companyId,
    });
  });
