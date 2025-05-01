import { purchaseInvoicePayloadSchema } from "@/model/purchase-invoice";
import { companyProcedure } from "@/trpc/trpc";
import { serverErrorFormatter } from "@/utils/formatter/errorFormatter";

import { AccountRepository } from "@/server/account";
import { DefaultAccountRepository } from "@/server/defaultAccount/default-account.repository";
import { getDefaultAccountUseCase } from "@/server/defaultAccount/use-cases/get-default-account.use-case";
import { JournalRepository } from "@/server/journal/journal.repository";
import { createJournalUseCase } from "@/server/journal/use-cases/create-journal.use-case";
import { JournalDetailRepository } from "@/server/journalDetail/journal-detail.repository";
import { PurchaseInvoiceRepository } from "@/server/purchaseInvoice/purchase-invoice.repository";
import { createPurchaseInvoiceUseCase } from "@/server/purchaseInvoice/use-cases/create-purchase-invoice.use-case";
import { TransactionService } from "@/server/services";

export const createPurchaseInvoiceController = companyProcedure
  .input(purchaseInvoicePayloadSchema)
  .mutation(async ({ ctx, input }) => {
    const transactionService = new TransactionService(ctx.db);
    return await transactionService.startTransaction(async (trx) => {
      const purchaseInvoiceRepo = new PurchaseInvoiceRepository(trx);
      const defaultAccountRepo = new DefaultAccountRepository(trx);
      const journalRepo = new JournalRepository(trx);
      const accountRepo = new AccountRepository(trx);
      const journalDetailRepo = new JournalDetailRepository(trx);

      const createPurchaseInvoice = await createPurchaseInvoiceUseCase(
        purchaseInvoiceRepo,
      )({ ...input, companyId: ctx.session.user.companyId });

      const getDefaultAccount = await getDefaultAccountUseCase(
        defaultAccountRepo,
      )(ctx.session.user.companyId);

      const akunPersediaan = getDefaultAccount.find(
        (data) => data.category === "PERSEDIAAN",
      );

      const akunHutang = getDefaultAccount.find(
        (data) => data.category === "HUTANG_USAHA",
      );

      if (!akunPersediaan || !akunHutang)
        serverErrorFormatter("BAD_REQUEST", "Akun tidak ditemukan");

      await createJournalUseCase(
        journalRepo,
        journalDetailRepo,
        accountRepo,
      )({
        companyId: ctx.session.user.companyId,
        date: input.date,
        description: `Pembelian Barang Dagang`,
        ref: createPurchaseInvoice.ref!,
        type: "GENERAL",
        details: [
          {
            accountId: akunPersediaan!.id,
            credit: 0,
            debit: createPurchaseInvoice.receiveItem.totalAmount,
          },
          {
            accountId: akunHutang!.id,
            credit: createPurchaseInvoice.receiveItem.totalAmount,
            debit: 0,
          },
        ],
      });
    });
  });
