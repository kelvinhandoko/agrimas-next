import { type JournalPayload } from "@/model";
import { productPayloadSchema } from "@/model/product.model";
import { adminCompanyProcedure } from "@/trpc/trpc";

import { AccountRepository } from "@/server/account";
import { DefaultAccountRepository } from "@/server/defaultAccount/default-account.repository";
import { getDefaultAccountUseCase } from "@/server/defaultAccount/use-cases/get-default-account.use-case";
import { GeneralLedgerRepository } from "@/server/generalLedger/repository/general-ledger.repository";
import { createGeneralLedgerUseCase } from "@/server/generalLedger/use-cases/create-general-ledger.use-case";
import { InitialProductRepository } from "@/server/initialProduct/initial-product.repository";
import { createInitialProductUseCase } from "@/server/initialProduct/use-cases/create-initial-product.use-case";
import { JournalRepository } from "@/server/journal/journal.repository";
import { createJournalOrchestrator } from "@/server/journal/orchestrator/create-journal.orchestrator";
import { createJournalUseCase } from "@/server/journal/use-cases/create-journal.use-case";
import { JournalDetailRepository } from "@/server/journalDetail/journal-detail.repository";
import { createJournalDetailUseCase } from "@/server/journalDetail/use-cases/create-journal-detail.use-case";
import { ProductRepository } from "@/server/product/product.repository";
import { createProductUseCase } from "@/server/product/use-cases/create-product.use-case";
import { TransactionService } from "@/server/services";

export const createProductController = adminCompanyProcedure
  .input(productPayloadSchema)
  .mutation(async ({ ctx, input }) => {
    const transactionService = new TransactionService(ctx.db);
    return await transactionService.startTransaction(async (tx) => {
      const productRepo = new ProductRepository(tx);
      const initialProductRepo = new InitialProductRepository(tx);
      const defaultAccountRepo = new DefaultAccountRepository(tx);
      const journalRepo = new JournalRepository(tx);
      const journalDetailRepo = new JournalDetailRepository(tx);
      const accountRepo = new AccountRepository(tx);
      const generalLedgerRepo = new GeneralLedgerRepository(tx);

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

      const defaultData = await getDefaultAccount(ctx.session.user.companyId);

      const product = await createProductUseCase(productRepo)({
        ...input,
        companyId: ctx.session.user.companyId,
      });

      if (input.quantity && input.price) {
        await createInitialProductUseCase(initialProductRepo)({
          ...input,
          companyId: ctx.session.user.companyId,
          productId: product.id,
        });

        const journalDetailPayload = [] as JournalPayload["details"];
        journalDetailPayload.push({
          accountId: defaultData.get("PERSEDIAAN")!,
          debit: input.quantity * input.price,
          credit: 0,
        });
        journalDetailPayload.push({
          accountId: defaultData.get("EKUITAS")!,
          debit: 0,
          credit: input.quantity * input.price,
        });
        await createJournal({
          type: "GENERAL",
          companyId: ctx.session.user.companyId,
          date: new Date(),
          description: `Initial stock for product ${product.name}`,
          details: journalDetailPayload,
        });
        return product;
      }
    });
  });
