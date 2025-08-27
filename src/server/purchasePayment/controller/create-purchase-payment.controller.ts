import { purchasePaymentPayloadSchema } from "@/model/purchase-payment.model";
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
import { PaymentMethodRepository } from "@/server/paymentMethod/payment-method.repository";
import { getDetailPaymentMethodUseCase } from "@/server/paymentMethod/use-cases/get-detail-payment-method.use-case";
import { updatePaymentMethodUseCase } from "@/server/paymentMethod/use-cases/update-payment-method.use-case";
import { PurchaseInvoiceRepository } from "@/server/purchaseInvoice/purchase-invoice.repository";
import { createPurchasePaymentOrchestrator } from "@/server/purchasePayment/create-purchase-payment.orchestrator";
import { PurchasePaymentRepository } from "@/server/purchasePayment/purchase-payment.repository";
import { createPurchasePaymentUseCase } from "@/server/purchasePayment/use-case/create-purchase-payment.use-case";
import { TransactionService } from "@/server/services";

export const createPurchasePaymentController = companyProcedure
  .input(purchasePaymentPayloadSchema)
  .mutation(async ({ ctx, input }) => {
    const transactionService = new TransactionService(ctx.db);

    return await transactionService.startTransaction(async (tx) => {
      // Initialize repositories
      const purchasePaymentRepo = new PurchasePaymentRepository(tx);
      const paymentMethodRepo = new PaymentMethodRepository(tx);
      const defaultAccountRepo = new DefaultAccountRepository(tx);
      const purchaseInvoiceRepo = new PurchaseInvoiceRepository(tx);
      const journalRepo = new JournalRepository(tx);
      const journalDetailRepo = new JournalDetailRepository(tx);
      const generalLedgerRepo = new GeneralLedgerRepository(tx);
      const accountRepo = new AccountRepository(tx);
      // Initialize use cases
      const findPaymentMethod =
        getDetailPaymentMethodUseCase(paymentMethodRepo);
      const createPurchasePayment = createPurchasePaymentUseCase(
        purchasePaymentRepo,
        purchaseInvoiceRepo,
      );
      const getDefaultAccount = getDefaultAccountUseCase(defaultAccountRepo);
      const updatePaymentMethod = updatePaymentMethodUseCase(paymentMethodRepo);
      const createJournal = createJournalOrchestrator({
        createJournalUseCase: createJournalUseCase(journalRepo),
        createJournalDetailUseCase: createJournalDetailUseCase({
          accountRepo,
          journalDetailRepo,
        }),
        createGeneralLedgerUseCase:
          createGeneralLedgerUseCase(generalLedgerRepo),
      });

      const orchestrator = createPurchasePaymentOrchestrator({
        findPaymentMethod,
        createPurchasePayment,
        getDefaultAccount,
        updatePaymentMethod,
        createJournal,
      });

      // Execute orchestrator
      return await orchestrator({
        ...input,
        companyId: ctx.session.user.companyId,
      });
    });
  });
