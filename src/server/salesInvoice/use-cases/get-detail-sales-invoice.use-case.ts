import { TRPCError } from "@trpc/server";

import { type SalesInvoiceRepository } from "@/server/salesInvoice/sales-invoice.repository";

export const getDetailSalesInvoiceUseCase =
  (repo: SalesInvoiceRepository) => async (id: string) => {
    const data = await repo.getDetail(id);
    if (!data) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "faktur penjualan tidak ditemukan",
      });
    }
    return data;
  };
