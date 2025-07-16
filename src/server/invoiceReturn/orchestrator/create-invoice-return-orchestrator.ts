import { type InvoiceReturnPayload } from "@/model/invoice-return.model";

import { type GetDetailByIdCustomerUseCase } from "@/server/customer";
import { type ICreateInvoiceReturnUseCase } from "@/server/invoiceReturn/use-cases/create-invoice-return.use-case";

export const createInvoiceReturnOrchestrator =
  (usecases: {
    createInvoiceReturn: ICreateInvoiceReturnUseCase;
    getCustomer: GetDetailByIdCustomerUseCase;
  }) =>
  async (payload: InvoiceReturnPayload) => {
    const { createInvoiceReturn, getCustomer } = usecases;
    await getCustomer({ id: payload.customerId });

    const invoiceReturn = await createInvoiceReturn(payload);
    return invoiceReturn;
  };
