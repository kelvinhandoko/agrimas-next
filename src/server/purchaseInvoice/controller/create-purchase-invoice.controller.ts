import { purchaseInvoicePayloadSchema } from "@/model/purchase-invoice";
import { companyProcedure } from "@/trpc/trpc";

import { AccountRepository } from "@/server/account";
import { DefaultAccountRepository } from "@/server/defaultAccount/default-account.repository";
import { getDefaultAccountUseCase } from "@/server/defaultAccount/use-cases/get-default-account.use-case";
import { GeneralLedgerRepository } from "@/server/generalLedger/repository/general-ledger.repository";
import { createGeneralLedgerUseCase } from "@/server/generalLedger/use-cases/create-general-ledger.use-case";
import { JournalRepository } from "@/server/journal/journal.repository";
import { createJournalOrchestrator } from "@/server/journal/orchestrator/create-journal.orchestrator";
import { createJournalUseCase } from "@/server/journal/use-cases/create-journal.use-case";
import { JournalDetailRepository } from "@/server/journalDetail/journal-detail.repository";
import { createJournalDetailUseCase } from "@/server/journalDetail/use-cases/create-journal-detail.use-case";
import { createPurchaseInvoiceOrchestrator } from "@/server/purchaseInvoice/orchestrator/create-purchase-invoice.orchestrator";
import { PurchaseInvoiceRepository } from "@/server/purchaseInvoice/purchase-invoice.repository";
import { createPurchaseInvoiceUseCase } from "@/server/purchaseInvoice/use-cases/create-purchase-invoice.use-case";
import { TransactionService } from "@/server/services";

export const createPurchaseInvoiceController = companyProcedure
  .input(purchaseInvoicePayloadSchema)
  .mutation(async ({ ctx, input }) => {
    const transactionService = new TransactionService(ctx.db);

    return await transactionService.startTransaction(async (trx) => {
      // Initialize repositories
      const purchaseInvoiceRepo = new PurchaseInvoiceRepository(trx);
      const defaultAccountRepo = new DefaultAccountRepository(trx);
      const journalRepo = new JournalRepository(trx);
      const journalDetailRepo = new JournalDetailRepository(trx);
      const generalLedgerRepo = new GeneralLedgerRepository(trx);
      const accountRepo = new AccountRepository(trx);

      // Initialize use cases
      const createPurchaseInvoice =
        createPurchaseInvoiceUseCase(purchaseInvoiceRepo);
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

      const orchestrator = createPurchaseInvoiceOrchestrator({
        createPurchaseInvoice,
        getDefaultAccount,
        createJournal,
      });

      return await orchestrator({
        ...input,
        companyId: ctx.session.user.companyId,
      });
    });
  });
