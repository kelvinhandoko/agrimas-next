import { invoiceReturnPayloadSchema } from "@/model/invoice-return.model";
import { companyProcedure } from "@/trpc/trpc";

import { AccountRepository } from "@/server/account";
import {
  CustomerRepository,
  getDetailByIdCustomerUseCase,
} from "@/server/customer";
import { DefaultAccountRepository } from "@/server/defaultAccount/default-account.repository";
import { getDefaultAccountUseCase } from "@/server/defaultAccount/use-cases/get-default-account.use-case";
import { GeneralLedgerRepository } from "@/server/generalLedger/repository/general-ledger.repository";
import { createGeneralLedgerUseCase } from "@/server/generalLedger/use-cases/create-general-ledger.use-case";
import { InvoiceReturnRepository } from "@/server/invoiceReturn/invoice-return.repository";
import { createInvoiceReturnOrchestrator } from "@/server/invoiceReturn/orchestrator/create-invoice-return-orchestrator";
import { createInvoiceReturnUseCase } from "@/server/invoiceReturn/use-cases/create-invoice-return.use-case";
import { InvoiceReturnDetailRepository } from "@/server/invoiceReturnDetail/invoice-return-detail.repository";
import { createInvoiceReturnDetailUseCase } from "@/server/invoiceReturnDetail/use-cases/create-invoice-return-detail.use-case";
import { JournalRepository } from "@/server/journal/journal.repository";
import { createJournalOrchestrator } from "@/server/journal/orchestrator/create-journal.orchestrator";
import { createJournalUseCase } from "@/server/journal/use-cases/create-journal.use-case";
import { JournalDetailRepository } from "@/server/journalDetail/journal-detail.repository";
import { createJournalDetailUseCase } from "@/server/journalDetail/use-cases/create-journal-detail.use-case";
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
      // Initialize all repositories
      const invoiceReturnRepo = new InvoiceReturnRepository(tx);
      const invoiceReturnDetailRepo = new InvoiceReturnDetailRepository(tx);
      const customerRepo = new CustomerRepository(tx);
      const soldProductRepo = new SoldProductRepository(tx);
      const defaultAccountRepo = new DefaultAccountRepository(tx);
      const journalRepo = new JournalRepository(tx);
      const journalDetailRepo = new JournalDetailRepository(tx);
      const generalLedgerRepo = new GeneralLedgerRepository(tx);
      const accountRepo = new AccountRepository(tx);

      // Initialize main orchestrator use cases
      const createInvoiceReturn = createInvoiceReturnUseCase(invoiceReturnRepo);
      const getCustomer = getDetailByIdCustomerUseCase(customerRepo);
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

      // Initialize detail use cases
      const createInvoiceReturnDetail = createInvoiceReturnDetailUseCase(
        invoiceReturnDetailRepo,
      );

      // Initialize sold product orchestrator use cases
      const createSoldProduct = createSoldProductUseCase(soldProductRepo);
      const findSoldProduct = findSoldProductUseCase(soldProductRepo);
      const updateSoldProduct = updateSoldProductUseCase(soldProductRepo);

      const handleSoldProduct = handleSoldProductOrchestrator({
        createSoldProduct,
        findSoldProduct,
        updateSoldProduct,
      });

      // Create main orchestrator with all required use cases
      const orchestrator = createInvoiceReturnOrchestrator({
        createInvoiceReturn,
        getCustomer,
        createInvoiceReturnDetail,
        handleSoldProduct,
        getDefaultAccount,
        createJournal,
      });

      // Execute orchestrator
      return await orchestrator({
        ...input,
        companyId: ctx.session.user.companyId,
      });
    });
  });
