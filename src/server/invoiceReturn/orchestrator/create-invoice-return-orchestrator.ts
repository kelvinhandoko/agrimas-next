import { type InvoiceReturnPayload } from "@/model/invoice-return.model";

import { type GetDetailByIdCustomerUseCase } from "@/server/customer";
import { type ICreateInvoiceReturnUseCase } from "@/server/invoiceReturn/use-cases/create-invoice-return.use-case";
import { type ICreateInvoiceReturnDetailUseCase } from "@/server/invoiceReturnDetail/use-cases/create-invoice-return-detail.use-case";

export const createInvoiceReturnOrchestrator =
  (usecases: {
    createInvoiceReturn: ICreateInvoiceReturnUseCase;
    getCustomer: GetDetailByIdCustomerUseCase;
    createInvoiceReturnDetail: ICreateInvoiceReturnDetailUseCase;
  }) =>
  async (payload: InvoiceReturnPayload) => {
    const { createInvoiceReturn, getCustomer, createInvoiceReturnDetail } =
      usecases;
    await getCustomer({ id: payload.customerId });

    const invoiceReturn = await createInvoiceReturn(payload);
    await Promise.all(
      payload.detail.map(async (d) => {
        await createInvoiceReturnDetail({
          ...d,
          invoiceReturnId: invoiceReturn.id,
          companyId: invoiceReturn.companyId,
        });
      }),
    );
    return invoiceReturn;
  };
