import { type PaginatedQuery } from "@/server/common";
import { type SalesInvoiceRepository } from "@/server/salesInvoice/sales-invoice.repository";

export const getSalesInvoiceUseCase =
  (repo: SalesInvoiceRepository) => async (q: PaginatedQuery) => {
    return await repo.get(q);
  };
