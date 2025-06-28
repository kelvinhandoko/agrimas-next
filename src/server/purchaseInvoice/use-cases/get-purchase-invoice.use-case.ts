import { type PaginatedPurchaseInvoiceQuery } from "@/model/purchase-invoice";

import { type PurchaseInvoiceRepository } from "@/server/purchaseInvoice/purchase-invoice.repository";

export const getPurchaseInvoiceUseCase =
  (repo: PurchaseInvoiceRepository) =>
  async (q: PaginatedPurchaseInvoiceQuery) =>
    await repo.get(q);
