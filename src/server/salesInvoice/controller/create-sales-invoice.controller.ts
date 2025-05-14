import { type JournalDetailPayload } from "@/model";
import { salesInvoicePayloadSchema } from "@/model/sales-invoice.model";
import { companyProcedure } from "@/trpc/trpc";
import { TRPCError } from "@trpc/server";

import { AccountRepository } from "@/server/account";
import { CustomerRepository } from "@/server/customer";
import { DefaultAccountRepository } from "@/server/defaultAccount/default-account.repository";
import { getDefaultAccountUseCase } from "@/server/defaultAccount/use-cases/get-default-account.use-case";
import { JournalRepository } from "@/server/journal/journal.repository";
import { createJournalUseCase } from "@/server/journal/use-cases/create-journal.use-case";
import { JournalDetailRepository } from "@/server/journalDetail/journal-detail.repository";
import { createJournalDetailUseCase } from "@/server/journalDetail/use-cases/create-journal-detail.use-case";
import { ProductRepository } from "@/server/product/product.repository";
import { getTotalCOGSUseCase } from "@/server/product/use-cases/get-total-cogs.use-case";
import { SalesInvoiceRepository } from "@/server/salesInvoice/sales-invoice.repository";
import { createSalesInvoiceUseCase } from "@/server/salesInvoice/use-cases/create-sales-invoice.use-case";
import { SalesInvoiceDetailRepository } from "@/server/salesInvoiceDetail/sales-invoice-detail.repository";
import { createSalesInvoiceDetailUseCase } from "@/server/salesInvoiceDetail/use-cases/create-sales-invoice-detail.use-case";
import { SalesPersonRepository } from "@/server/salesPerson/sales-person.repository";
import { TransactionService } from "@/server/services";

export const createSalesInvoiceController = companyProcedure
  .input(salesInvoicePayloadSchema)
  .mutation(async ({ ctx, input }) => {
    const transactionService = new TransactionService(ctx.db);
    return await transactionService.startTransaction(async (trx) => {
      const salesInvoiceRepo = new SalesInvoiceRepository(trx);
      const salesPersonRepo = new SalesPersonRepository(trx);
      const customerRepo = new CustomerRepository(trx);

      const salesInvoiceDetailRepo = new SalesInvoiceDetailRepository(trx);
      const productRepo = new ProductRepository(trx);

      const defaultAccountRepo = new DefaultAccountRepository(trx);

      const journalRepo = new JournalRepository(trx);
      const journalDetailRepo = new JournalDetailRepository(trx);
      const accountRepo = new AccountRepository(trx);

      const totalCOGS = await getTotalCOGSUseCase(productRepo)(
        input.details.map(({ quantity, productId }) => {
          return {
            id: productId,
            quantity,
          };
        }),
      );

      const createdSalesInvoice = await createSalesInvoiceUseCase({
        salesInvoiceRepo,
        salesPersonRepo,
        customerRepo,
      })({
        ...input,
        cogs: totalCOGS,
        companyId: ctx.session.user.companyId,
      });

      await Promise.all(
        input.details.map(async (detail) => {
          await createSalesInvoiceDetailUseCase({
            salesInvoiceDetailRepo,
            productRepo,
          })({
            ...detail,
            salesInvoiceId: createdSalesInvoice.id,
          });
        }),
      );

      const getDefaultAccount = await getDefaultAccountUseCase(
        defaultAccountRepo,
      )(ctx.session.user.companyId);

      const akunPenjualan = getDefaultAccount.find(
        (data) => data.category === "PENJUALAN",
      );

      const akunPiutang = getDefaultAccount.find(
        (data) => data.category === "PIUTANG_USAHA",
      );

      const akunHPP = getDefaultAccount.find((data) => data.category === "HPP");

      const akunPersediaan = getDefaultAccount.find(
        (data) => data.category === "PERSEDIAAN",
      );

      if (!akunPenjualan?.id) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Akun Penjualan tidak ditemukan",
        });
      }
      if (!akunPiutang?.id) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Akun Piutang tidak ditemukan",
        });
      }

      if (!akunHPP?.id) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Akun HPP tidak ditemukan",
        });
      }

      if (!akunPersediaan?.id) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Akun Persediaan tidak ditemukan",
        });
      }

      const createdJournal = await createJournalUseCase(journalRepo)({
        companyId: ctx.session.user.companyId,
        date: input.date,
        description: `Penjualan Barang Dagang`,
        ref: createdSalesInvoice.ref,
        type: "GENERAL",
      });

      const journalDetailsData: JournalDetailPayload[] = [
        {
          accountId: akunPiutang.id,
          credit: 0,
          debit: createdSalesInvoice.totalBefore,
          journalId: createdJournal.id,
        },
        {
          accountId: akunPenjualan.id,
          credit: createdSalesInvoice.totalBefore,
          debit: 0,
          journalId: createdJournal.id,
        },
        {
          accountId: akunHPP.id,
          credit: totalCOGS,
          debit: 0,
          journalId: createdJournal.id,
        },
        {
          accountId: akunPersediaan.id,
          credit: totalCOGS,
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

      return createdSalesInvoice;
    });
  });
