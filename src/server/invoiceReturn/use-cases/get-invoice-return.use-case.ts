import { type PaginatedInvoiceReturnQuery } from "@/model/invoice-return.model";

import { type InvoiceReturnRepository } from "@/server/invoiceReturn/invoice-return.repository";

export const getInvoiceReturnUseCase =
  (repo: InvoiceReturnRepository) => async (q: PaginatedInvoiceReturnQuery) =>
    await repo.get(q);
