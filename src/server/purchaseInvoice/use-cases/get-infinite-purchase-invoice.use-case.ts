import { CursorPurchaseInvoiceQuery } from "@/model/purchase-invoice";

import { type PurchaseInvoiceRepository } from "@/server/purchaseInvoice/purchase-invoice.repository";

export const getInfinitePurchaseInvoiceUseCase =
  (repo: PurchaseInvoiceRepository) => async (q: CursorPurchaseInvoiceQuery) =>
    await repo.getInfinite(q);
