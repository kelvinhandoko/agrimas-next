import { type SalesPaymentPayload } from "@/model/sales-payment.model";
import { paymentStatusHelper } from "@/utils/paymentStatusHelper";
import { TRPCError } from "@trpc/server";

import { IUpdatePaymentMethodUseCase } from "@/server/paymentMethod/use-cases/update-payment-method.use-case";
import { type SalesInvoiceRepository } from "@/server/salesInvoice/sales-invoice.repository";
import { type SalesPaymentRepository } from "@/server/salesPayment/sales-payment.repository";

export const createSalesPaymentUseCase =
  (repos: {
    salesRepo: SalesInvoiceRepository;
    salesPaymentRepo: SalesPaymentRepository;
  }) =>
  async (payload: SalesPaymentPayload) => {
    const { salesPaymentRepo, salesRepo } = repos;
    const findSales = await salesRepo.getDetail(payload.salesInvoiceId);
    if (!findSales) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "faktur penjualan tidak ditemukan",
      });
    }
    const totalPayment = findSales.totalPayment + payload.amount;
    if (findSales.totalAfter - totalPayment < 0) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "pembayaran faktur melebihi jumlah tagihan",
      });
    }
    await salesRepo.update({
      id: findSales.id,
      date: findSales.date,
      status: paymentStatusHelper(findSales.totalAfter, totalPayment),
      totalPayment,
    });
    const createdSalesPayment = await salesPaymentRepo.create(payload);
    return { ...createdSalesPayment, ref: findSales.ref };
  };

export type ICreateSalesPaymentUseCase = ReturnType<
  typeof createSalesPaymentUseCase
>;
