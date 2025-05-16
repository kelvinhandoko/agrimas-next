import { companyProcedure } from "@/trpc/trpc";

import { paginatedQuery } from "@/server/common";
import { SalesInvoiceRepository } from "@/server/salesInvoice/sales-invoice.repository";
import { getSalesInvoiceUseCase } from "@/server/salesInvoice/use-cases/get-sales-invoice.use-case";

export const getSalesInvoiceController = companyProcedure
  .input(paginatedQuery)
  .query(async ({ ctx, input }) => {
    const salesInvoiceRepo = new SalesInvoiceRepository(ctx.db);
    const { limit, page, search } = input;

    return await getSalesInvoiceUseCase(salesInvoiceRepo)({
      companyId: ctx.session.user.companyId,
      limit,
      page,
      search,
    });
  });
