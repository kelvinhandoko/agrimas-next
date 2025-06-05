import { type CursorQuery } from "@/server/common";
import { type SalesInvoiceRepository } from "@/server/salesInvoice/sales-invoice.repository";

export const getInfiniteSalesInvoiceUseCase =
  (repo: SalesInvoiceRepository) => async (q: CursorQuery) => {
    return await repo.getInfinite(q);
  };
