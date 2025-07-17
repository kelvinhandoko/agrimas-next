import { type InvoiceReturnPayload } from "@/model/invoice-return.model";

import { type GetDetailByIdCustomerUseCase } from "@/server/customer";
import { type ICreateInvoiceReturnUseCase } from "@/server/invoiceReturn/use-cases/create-invoice-return.use-case";
import { type ICreateInvoiceReturnDetailUseCase } from "@/server/invoiceReturnDetail/use-cases/create-invoice-return-detail.use-case";
import { type HandleSoldProductOrchestrator } from "@/server/soldProduct/orchestrator/handle-sold-product.orchestrator";

export const createInvoiceReturnOrchestrator =
  (usecases: {
    createInvoiceReturn: ICreateInvoiceReturnUseCase;
    getCustomer: GetDetailByIdCustomerUseCase;
    createInvoiceReturnDetail: ICreateInvoiceReturnDetailUseCase;
    handleSoldProduct: HandleSoldProductOrchestrator;
  }) =>
  async (payload: InvoiceReturnPayload) => {
    const {
      createInvoiceReturn,
      getCustomer,
      createInvoiceReturnDetail,
      handleSoldProduct,
    } = usecases;
    await getCustomer({ id: payload.customerId });

    const invoiceReturn = await createInvoiceReturn(payload);
    await Promise.all(
      payload.detail.map(async (d) => {
        await handleSoldProduct({
          customerId: payload.customerId,
          productId: d.productId,
          return: d.quantity,
        });
        await createInvoiceReturnDetail({
          ...d,
          invoiceReturnId: invoiceReturn.id,
          companyId: invoiceReturn.companyId,
        });
      }),
    );
    return invoiceReturn;
  };
