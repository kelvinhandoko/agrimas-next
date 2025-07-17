import { invoiceReturnPayloadSchema } from "@/model/invoice-return.model";
import { companyProcedure } from "@/trpc/trpc";

import {
  CustomerRepository,
  getDetailByIdCustomerUseCase,
} from "@/server/customer";
import { InvoiceReturnRepository } from "@/server/invoiceReturn/invoice-return.repository";
import { createInvoiceReturnOrchestrator } from "@/server/invoiceReturn/orchestrator/create-invoice-return-orchestrator";
import { createInvoiceReturnUseCase } from "@/server/invoiceReturn/use-cases/create-invoice-return.use-case";
import { InvoiceReturnDetailRepository } from "@/server/invoiceReturnDetail/invoice-return-detail.repository";
import { createInvoiceReturnDetailUseCase } from "@/server/invoiceReturnDetail/use-cases/create-invoice-return-detail.use-case";
import { TransactionService } from "@/server/services";
import { handleSoldProductOrchestrator } from "@/server/soldProduct/orchestrator/handle-sold-product.orchestrator";
import { SoldProductRepository } from "@/server/soldProduct/sold-product.repository";
import { createSoldProductUseCase } from "@/server/soldProduct/useCases/create-sold-product.use-case";
import { findSoldProductUseCase } from "@/server/soldProduct/useCases/find-sold-product.use-case";
import { updateSoldProductUseCase } from "@/server/soldProduct/useCases/update-sold-product.use-case";

export const createInvoiceReturnController = companyProcedure
  .input(invoiceReturnPayloadSchema)
  .mutation(async ({ ctx, input }) => {
    const transactionService = new TransactionService(ctx.db);
    return await transactionService.startTransaction(async (tx) => {
      const invoiceReturnRepo = new InvoiceReturnRepository(tx);
      const invoiceReturnDetailRepo = new InvoiceReturnDetailRepository(tx);
      const customerRepo = new CustomerRepository(tx);
      const soldProductRepo = new SoldProductRepository(tx);
      const createInvoiceReturn = createInvoiceReturnUseCase(invoiceReturnRepo);
      const getCustomer = getDetailByIdCustomerUseCase(customerRepo);
      const createInvoiceReturnDetail = createInvoiceReturnDetailUseCase(
        invoiceReturnDetailRepo,
      );

      const createSoldProduct = createSoldProductUseCase(soldProductRepo);
      const updateSoldProduct = updateSoldProductUseCase(soldProductRepo);
      const findSoldProduct = findSoldProductUseCase(soldProductRepo);

      const handleSoldProduct = handleSoldProductOrchestrator({
        createSoldProduct,
        updateSoldProduct,
        findSoldProduct,
      });

      return await createInvoiceReturnOrchestrator({
        createInvoiceReturn,
        createInvoiceReturnDetail,
        getCustomer,
        handleSoldProduct,
      })({
        ...input,
        companyId: ctx.session.user.companyId,
      });
    });
  });
