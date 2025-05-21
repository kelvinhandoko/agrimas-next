import { receiveableReportQuerySchema } from "@/model";
import { companyProcedure } from "@/trpc/trpc";

import { getReceiveableReportUseCase } from "@/server/report/use-cases/get-receiveable-report.use-case";
import { SalesInvoiceRepository } from "@/server/salesInvoice/sales-invoice.repository";

export const getReceiveableReportController = companyProcedure
  .input(receiveableReportQuerySchema)
  .query(async ({ ctx, input }) => {
    const salesInvoiceRepo = new SalesInvoiceRepository(ctx.db);
    return await getReceiveableReportUseCase(salesInvoiceRepo)({
      ...input,
      companyId: ctx.session.user.companyId,
    });
  });
