import { companyProcedure } from "@/trpc/trpc";
import { z } from "zod";

import { SalesInvoiceRepository } from "@/server/salesInvoice/sales-invoice.repository";
import { getDetailSalesInvoiceUseCase } from "@/server/salesInvoice/use-cases/get-detail-sales-invoice.use-case";

export const getDetailSalesInvoiceController = companyProcedure
  .input(z.string())
  .query(async ({ ctx, input }) => {
    const salesInvoiceRepo = new SalesInvoiceRepository(ctx.db);
    return await getDetailSalesInvoiceUseCase(salesInvoiceRepo)(input);
  });
