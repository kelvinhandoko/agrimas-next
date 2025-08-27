import { salesInvoicePayloadSchema } from "@/model/sales-invoice.model";
import { companyProcedure } from "@/trpc/trpc";

import { AccountRepository } from "@/server/account";
import { CustomerRepository } from "@/server/customer";
import { DefaultAccountRepository } from "@/server/defaultAccount/default-account.repository";
import { getDefaultAccountUseCase } from "@/server/defaultAccount/use-cases/get-default-account.use-case";
import { GeneralLedgerRepository } from "@/server/generalLedger/repository/general-ledger.repository";
import { createGeneralLedgerUseCase } from "@/server/generalLedger/use-cases/create-general-ledger.use-case";
import { JournalRepository } from "@/server/journal/journal.repository";
import { createJournalOrchestrator } from "@/server/journal/orchestrator/create-journal.orchestrator";
import { createJournalUseCase } from "@/server/journal/use-cases/create-journal.use-case";
import { JournalDetailRepository } from "@/server/journalDetail/journal-detail.repository";
import { createJournalDetailUseCase } from "@/server/journalDetail/use-cases/create-journal-detail.use-case";
import { ProductRepository } from "@/server/product/product.repository";
import { getTotalCOGSUseCase } from "@/server/product/use-cases/get-total-cogs.use-case";
import { createSalesInvoiceOrchestrator } from "@/server/salesInvoice/orchestrator/create-sales-invoice.orchestrator";
import { SalesInvoiceRepository } from "@/server/salesInvoice/sales-invoice.repository";
import { createSalesInvoiceUseCase } from "@/server/salesInvoice/use-cases/create-sales-invoice.use-case";
import { SalesInvoiceDetailRepository } from "@/server/salesInvoiceDetail/sales-invoice-detail.repository";
import { createSalesInvoiceDetailUseCase } from "@/server/salesInvoiceDetail/use-cases/create-sales-invoice-detail.use-case";
import { SalesPersonRepository } from "@/server/salesPerson/sales-person.repository";
import { TransactionService } from "@/server/services";
import { handleSoldProductOrchestrator } from "@/server/soldProduct/orchestrator/handle-sold-product.orchestrator";
import { SoldProductRepository } from "@/server/soldProduct/sold-product.repository";
import { createSoldProductUseCase } from "@/server/soldProduct/useCases/create-sold-product.use-case";
import { findSoldProductUseCase } from "@/server/soldProduct/useCases/find-sold-product.use-case";
import { updateSoldProductUseCase } from "@/server/soldProduct/useCases/update-sold-product.use-case";

export const createSalesInvoiceController = companyProcedure
  .input(salesInvoicePayloadSchema)
  .mutation(async ({ ctx, input }) => {
    const transactionService = new TransactionService(ctx.db);

    return await transactionService.startTransaction(async (trx) => {
      // Initialize repositories
      const salesInvoiceRepo = new SalesInvoiceRepository(trx);
      const salesPersonRepo = new SalesPersonRepository(trx);
      const customerRepo = new CustomerRepository(trx);
      const salesInvoiceDetailRepo = new SalesInvoiceDetailRepository(trx);
      const productRepo = new ProductRepository(trx);
      const soldProductRepo = new SoldProductRepository(trx);
      const defaultAccountRepo = new DefaultAccountRepository(trx);
      const journalRepo = new JournalRepository(trx);
      const journalDetailRepo = new JournalDetailRepository(trx);
      const generalLedgerRepo = new GeneralLedgerRepository(trx);
      const accountRepo = new AccountRepository(trx);
      // Initialize use cases
      const createSalesInvoice = createSalesInvoiceUseCase({
        salesInvoiceRepo,
        salesPersonRepo,
        customerRepo,
      });

      const handleSoldProduct = handleSoldProductOrchestrator({
        createSoldProduct: createSoldProductUseCase(soldProductRepo),
        updateSoldProduct: updateSoldProductUseCase(soldProductRepo),
        findSoldProduct: findSoldProductUseCase(soldProductRepo),
      });

      const createSalesInvoiceDetail = createSalesInvoiceDetailUseCase({
        salesInvoiceDetailRepo,
        productRepo,
      });

      const getTotalCOGS = getTotalCOGSUseCase(productRepo);

      const getDefaultAccount = getDefaultAccountUseCase(defaultAccountRepo);

      const createJournal = createJournalOrchestrator({
        createJournalUseCase: createJournalUseCase(journalRepo),
        createJournalDetailUseCase: createJournalDetailUseCase({
          accountRepo,
          journalDetailRepo,
        }),
        createGeneralLedgerUseCase:
          createGeneralLedgerUseCase(generalLedgerRepo),
      });

      // Use orchestrator
      const salesInvoiceOrchestrator = createSalesInvoiceOrchestrator({
        createSalesInvoice,
        handleSoldProduct,
        createSalesInvoiceDetail,
        getTotalCOGS,
        createJournal,
        getDefaultAccount,
      });

      // Execute orchestrator
      return await salesInvoiceOrchestrator({
        ...input,
        cogs: 0,
        companyId: ctx.session.user.companyId,
      });
    });
  });
