import { paginatedInvoiceReturnQuerySchema } from "@/model/invoice-return.model";
import { companyProcedure } from "@/trpc/trpc";

import { InvoiceReturnRepository } from "@/server/invoiceReturn/invoice-return.repository";
import { getInvoiceReturnUseCase } from "@/server/invoiceReturn/use-cases/get-invoice-return.use-case";

export const getInvoiceReturnController = companyProcedure
  .input(paginatedInvoiceReturnQuerySchema)
  .query(async ({ ctx, input }) => {
    const invoiceReturnRepo = new InvoiceReturnRepository(ctx.db);
    return await getInvoiceReturnUseCase(invoiceReturnRepo)({
      ...input,
      companyId: ctx.session.user.companyId,
    });
  });
