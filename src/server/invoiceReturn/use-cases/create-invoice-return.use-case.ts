import { type InvoiceReturnPayload } from "@/model/invoice-return.model";

import { type InvoiceReturnRepository } from "@/server/invoiceReturn/invoice-return.repository";

export const createInvoiceReturnUseCase =
  (repo: InvoiceReturnRepository) => async (payload: InvoiceReturnPayload) => {
    return await repo.create(payload);
  };

export type ICreateInvoiceReturnUseCase = ReturnType<
  Awaited<typeof createInvoiceReturnUseCase>
>;
