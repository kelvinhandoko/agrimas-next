import { purchaseInvoicePayloadSchema } from "@/model/purchase-invoice";
import { companyProcedure } from "@/trpc/trpc";

import { PurchaseInvoiceRepository } from "@/server/purchaseInvoice/purchase-invoice.repository";
import { createPurchaseInvoiceUseCase } from "@/server/purchaseInvoice/use-cases/create-purchase-invoice.use-case";
import { TransactionService } from "@/server/services";

export const createPurchaseInvoiceController = companyProcedure
  .input(purchaseInvoicePayloadSchema)
  .mutation(async ({ ctx, input }) => {
    const transactionService = new TransactionService(ctx.db);

    return await transactionService.startTransaction(async (trx) => {
      const purchaseInvoiceRepo = new PurchaseInvoiceRepository(trx);
      // const defaultAccountRepo = new DefaultAccountRepository(trx);
      // const journalRepo = new JournalRepository(trx);
      // const accountRepo = new AccountRepository(trx);
      // const journalDetailRepo = new JournalDetailRepository(trx);

      const createPurchaseInvoice = await createPurchaseInvoiceUseCase(
        purchaseInvoiceRepo,
      )({ ...input, companyId: ctx.session.user.companyId });

      // const getDefaultAccount = await getDefaultAccountUseCase(
      //   defaultAccountRepo,
      // )(ctx.session.user.companyId);

      // const akunPersediaan = getDefaultAccount.find(
      //   (data) => data.category === "PERSEDIAAN",
      // );

      // const akunHutang = getDefaultAccount.find(
      //   (data) => data.category === "HUTANG_USAHA",
      // );

      // if (!akunPersediaan?.id) {
      //   throw new TRPCError({
      //     code: "NOT_FOUND",
      //     message: "Akun Persediaan tidak ditemukan",
      //   });
      // }
      // if (!akunHutang?.id) {
      //   throw new TRPCError({
      //     code: "NOT_FOUND",
      //     message: "Akun Hutang tidak ditemukan",
      //   });
      // }

      // const journalDetailsData: Pick<JournalPayload, "details"> = {
      //   details: [
      //     {
      //       accountId: akunPersediaan.id,
      //       credit: 0,
      //       debit: createPurchaseInvoice.receiveItem.totalAmount,
      //     },
      //     {
      //       accountId: akunHutang.id,
      //       credit: createPurchaseInvoice.receiveItem.totalAmount,
      //       debit: 0,
      //     },
      //   ],
      // };

      // const createdJournal = await createJournalUseCase(journalRepo)({
      //   companyId: ctx.session.user.companyId,
      //   date: input.date,
      //   description: `Pembelian Barang Dagang`,
      //   ref: createPurchaseInvoice.ref!,
      //   type: "GENERAL",
      // });

      // await Promise.all(
      //   journalDetailsData.details.map(async (data) => {
      //     await createJournalDetailUseCase({
      //       accountRepo,
      //       journalDetailRepo,
      //     })({ ...data, journalId: createdJournal.id });
      //   }),
      // );

      return createPurchaseInvoice;
    });
  });
