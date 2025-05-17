import { type JournalDetailPayload } from "@/model";
import { productPayloadSchema } from "@/model/product.model";
import { adminCompanyProcedure } from "@/trpc/trpc";
import { TRPCError } from "@trpc/server";

import { AccountRepository } from "@/server/account";
import { DefaultAccountRepository } from "@/server/defaultAccount/default-account.repository";
import { getDefaultAccountUseCase } from "@/server/defaultAccount/use-cases/get-default-account.use-case";
import { InitialProductRepository } from "@/server/initialProduct/initial-product.repository";
import { createInitialProductUseCase } from "@/server/initialProduct/use-cases/create-initial-product.use-case";
import { JournalRepository } from "@/server/journal/journal.repository";
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

      const product = await createProductUseCase(productRepo)({
        ...input,
        companyId: ctx.session.user.companyId,
      });

      if (input.quantity && input.price) {
        const getDefaultAccount = await getDefaultAccountUseCase(
          defaultAccountRepo,
        )(ctx.session.user.companyId);

        const akunPersediaan = getDefaultAccount.find(
          (data) => data.category === "PERSEDIAAN",
        );

        const akunModal = getDefaultAccount.find(
          (data) => data.category === "EKUITAS",
        );

        if (!akunPersediaan?.id) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Akun Persediaan tidak ditemukan",
          });
        }
        if (!akunModal?.id) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Akun Modal tidak ditemukan",
          });
        }
        await createInitialProductUseCase(initialProductRepo)({
          ...input,
          companyId: ctx.session.user.companyId,
          productId: product.id,
        });

        const createdJournal = await createJournalUseCase(journalRepo)({
          companyId: ctx.session.user.companyId,
          date: new Date(),
          description: `penambahan persediaan barang baru`,
          ref: "-",
          type: "GENERAL",
        });

        const journalDetailsData: JournalDetailPayload[] = [
          {
            accountId: akunPersediaan.accountId,
            credit: 0,
            debit: input.quantity * input.price,
            journalId: createdJournal.id,
          },
          {
            accountId: akunModal.accountId,
            credit: input.quantity * input.price,
            debit: 0,
            journalId: createdJournal.id,
          },
        ];
        await Promise.all(
          journalDetailsData.map(async (data) => {
            await createJournalDetailUseCase({
              accountRepo,
              journalDetailRepo,
            })({ ...data, journalId: createdJournal.id });
          }),
        );
      }
      return product;
    });
  });
