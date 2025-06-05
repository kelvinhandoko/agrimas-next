import { type PurchaseInvoiceRepository } from "@/server/purchaseInvoice/purchase-invoice.repository";

export const findDetailPurchaseInvoiceUseCase =
  (purchaseInvoiceRepo: PurchaseInvoiceRepository) => async (id: string) => {
    const purchaseInvoice = await purchaseInvoiceRepo.findDetail({ id });
    return purchaseInvoice;
  };
