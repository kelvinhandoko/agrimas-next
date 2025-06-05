import { companyProcedure } from "@/trpc/trpc";

import { cursorQuery } from "@/server/common";
import { SalesInvoiceRepository } from "@/server/salesInvoice/sales-invoice.repository";
import { getInfiniteSalesInvoiceUseCase } from "@/server/salesInvoice/use-cases/get-infinite-sales-invoice.use-case";

export const getInfiniteSalesInvoiceController = companyProcedure
  .input(cursorQuery)
  .query(async ({ ctx, input }) => {
    const salesInvoiceRepo = new SalesInvoiceRepository(ctx.db);
    const { limit, cursor, search } = input;

    return await getInfiniteSalesInvoiceUseCase(salesInvoiceRepo)({
      companyId: ctx.session.user.companyId,
      limit,
      cursor,
      search,
    });
  });
