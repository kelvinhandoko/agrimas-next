import { type InvoiceReturnDetailPayload } from "@/model/invoice-return-detail.model";

import { type InvoiceReturnDetailRepository } from "@/server/invoiceReturnDetail/invoice-return-detail.repository";

export const createInvoiceReturnDetailUseCase =
  (repo: InvoiceReturnDetailRepository) =>
  async (payload: InvoiceReturnDetailPayload) => {
    return await repo.create(payload);
  };

export type ICreateInvoiceReturnDetailUseCase = ReturnType<
  Awaited<typeof createInvoiceReturnDetailUseCase>
>;
