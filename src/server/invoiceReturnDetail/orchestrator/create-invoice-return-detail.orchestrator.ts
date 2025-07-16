import { type InvoiceReturnPayload } from "@/model/invoice-return.model";

import { type ICreateInvoiceReturnDetailUseCase } from "@/server/invoiceReturnDetail/use-cases/create-invoice-return-detail.use-case";
import { type GetDetailProductUseCase } from "@/server/product/use-cases/get-detail-product.use-case";

export const createInvoiceReturnOrchestrator =
  (usecases: {
    createInvoiceReturnDetail: ICreateInvoiceReturnDetailUseCase;
    getProduct: GetDetailProductUseCase;
  }) =>
  async (
    payload: InvoiceReturnPayload["detail"][number] & {
      invoiceReturnId: string;
      companyId: string;
    },
  ) => {
    const { createInvoiceReturnDetail, getProduct } = usecases;
    await getProduct(payload.productId);
    return await createInvoiceReturnDetail(payload);
  };
