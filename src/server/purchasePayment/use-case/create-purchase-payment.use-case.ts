import { type PurchasePaymentPayload } from "@/model/purchase-payment.model";
import { paymentStatusHelper } from "@/utils/paymentStatusHelper";
import { TRPCError } from "@trpc/server";

import { type PurchaseInvoiceRepository } from "@/server/purchaseInvoice/purchase-invoice.repository";
import { type PurchasePaymentRepository } from "@/server/purchasePayment/purchase-payment.repository";

export const createPurchasePaymentUseCase =
  (
    purchasePaymentRepo: PurchasePaymentRepository,
    purchaseInvoiceRepo: PurchaseInvoiceRepository,
  ) =>
  async (payload: PurchasePaymentPayload) => {
    const getPurchaseInvoice = await purchaseInvoiceRepo.findDetail({
      id: payload.purchaseInvoiceId,
    });

    if (!getPurchaseInvoice) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Purchase not found",
      });
    }

    const purchasePayment = await purchasePaymentRepo.create(payload);

    const paymentStatus = paymentStatusHelper(
      getPurchaseInvoice.receiveItem.totalAmount,
      getPurchaseInvoice.totalPayment + payload.amount,
    );

    await purchaseInvoiceRepo.updateStatus({
      id: payload.purchaseInvoiceId,
      paymentStatus,
    });

    return { ...purchasePayment, purchaseRef: getPurchaseInvoice.ref };
  };

export type ICreatePurchasePaymentUseCase = ReturnType<
  typeof createPurchasePaymentUseCase
>;
