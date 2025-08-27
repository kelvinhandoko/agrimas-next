import { salesPaymentPayload } from "@/model/sales-payment.model";
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
import { SalesInvoiceRepository } from "@/server/salesInvoice/sales-invoice.repository";
import { createSalesPaymentOrchestrator } from "@/server/salesPayment/orchestrator/create-sales-payment.orchestrator";
import { SalesPaymentRepository } from "@/server/salesPayment/sales-payment.repository";
import { createSalesPaymentUseCase } from "@/server/salesPayment/use-cases/create-sales-payment.use-case";
import { TransactionService } from "@/server/services";

export const createSalesPaymentController = companyProcedure
  .input(salesPaymentPayload)
  .mutation(async ({ ctx, input }) => {
    const transactionService = new TransactionService(ctx.db);
    return await transactionService.startTransaction(async (tx) => {
      const salesRepo = new SalesInvoiceRepository(tx);
      const salesPaymentRepo = new SalesPaymentRepository(tx);
      const paymentMethodRepo = new PaymentMethodRepository(tx);
      const defaultAccountRepo = new DefaultAccountRepository(tx);
      const journalRepo = new JournalRepository(tx);
      const journalDetailRepo = new JournalDetailRepository(tx);
      const generalLedgerRepo = new GeneralLedgerRepository(tx);
      const accountRepo = new AccountRepository(tx);

      const findPaymentMethod =
        getDetailPaymentMethodUseCase(paymentMethodRepo);
      const createSalesPayment = createSalesPaymentUseCase({
        salesPaymentRepo,
        salesRepo,
      });
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

      const updatePaymentMethod = updatePaymentMethodUseCase(paymentMethodRepo);

      const orchestrator = createSalesPaymentOrchestrator({
        findPaymentMethod,
        createSalesPayment,
        getDefaultAccount,
        createJournal,
        updatePaymentMethod,
      });

      return await orchestrator({
        ...input,
        companyId: ctx.session.user.companyId,
      });
    });
  });
