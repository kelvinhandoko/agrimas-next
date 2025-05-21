import { payableReportQuerySchema } from "@/model";
import { companyProcedure } from "@/trpc/trpc";

import { PurchaseInvoiceRepository } from "@/server/purchaseInvoice/purchase-invoice.repository";
import { getPayableReportUseCase } from "@/server/report/use-cases/get-payable-report.use-case";

export const getPayableReportController = companyProcedure
  .input(payableReportQuerySchema)
  .query(async ({ ctx, input }) => {
    const purchaseInvoiceRepo = new PurchaseInvoiceRepository(ctx.db);
    return await getPayableReportUseCase(purchaseInvoiceRepo)({
      ...input,
      companyId: ctx.session.user.companyId,
    });
  });
