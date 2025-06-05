import { type PurchaseInvoicePayload } from "@/model/purchase-invoice";

import { type PurchaseInvoiceRepository } from "@/server/purchaseInvoice/purchase-invoice.repository";

export const createPurchaseInvoiceUseCase =
  (purchaseInvoiceRepo: PurchaseInvoiceRepository) =>
  async (payload: PurchaseInvoicePayload) => {
    const purchaseInvoice = await purchaseInvoiceRepo.create(payload);
    return purchaseInvoice;
  };
