import { salesInvoicePayloadSchema } from "@/model/sales-invoice.model";
import { companyProcedure } from "@/trpc/trpc";

import { CustomerRepository } from "@/server/customer";
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

      // const getDefaultAccount = await getDefaultAccountUseCase(
      //   defaultAccountRepo,
      // )(ctx.session.user.companyId);

      // const akunPenjualan = getDefaultAccount.find(
      //   (data) => data.category === "PENJUALAN",
      // );

      // const akunPiutang = getDefaultAccount.find(
      //   (data) => data.category === "PIUTANG_USAHA",
      // );

      // const akunHPP = getDefaultAccount.find((data) => data.category === "HPP");

      // const akunPersediaan = getDefaultAccount.find(
      //   (data) => data.category === "PERSEDIAAN",
      // );

      // if (!akunPenjualan?.id) {
      //   throw new TRPCError({
      //     code: "NOT_FOUND",
      //     message: "Akun Penjualan tidak ditemukan",
      //   });
      // }
      // if (!akunPiutang?.id) {
      //   throw new TRPCError({
      //     code: "NOT_FOUND",
      //     message: "Akun Piutang tidak ditemukan",
      //   });
      // }

      // if (!akunHPP?.id) {
      //   throw new TRPCError({
      //     code: "NOT_FOUND",
      //     message: "Akun HPP tidak ditemukan",
      //   });
      // }

      // if (!akunPersediaan?.id) {
      //   throw new TRPCError({
      //     code: "NOT_FOUND",
      //     message: "Akun Persediaan tidak ditemukan",
      //   });
      // }

      // const createdJournal = await createJournalUseCase(journalRepo)({
      //   companyId: ctx.session.user.companyId,
      //   date: input.date,
      //   description: `Penjualan Barang Dagang`,
      //   ref: createdSalesInvoice.ref,
      //   type: "GENERAL",
      // });

      // const journalDetailsData: JournalDetailPayload[] = [
      //   {
      //     accountId: akunPiutang.accountId,
      //     credit: 0,
      //     debit: createdSalesInvoice.totalAfter,
      //     journalId: createdJournal.id,
      //   },
      //   {
      //     accountId: akunPenjualan.accountId,
      //     credit: createdSalesInvoice.totalAfter,
      //     debit: 0,
      //     journalId: createdJournal.id,
      //   },
      //   {
      //     accountId: akunHPP.accountId,
      //     credit: 0,
      //     debit: totalCOGS,
      //     journalId: createdJournal.id,
      //   },
      //   {
      //     accountId: akunPersediaan.accountId,
      //     credit: totalCOGS,
      //     debit: 0,
      //     journalId: createdJournal.id,
      //   },
      // ];

      // await Promise.all(
      //   journalDetailsData.map(async (data) => {
      //     await createJournalDetailUseCase({
      //       accountRepo,
      //       journalDetailRepo,
      //     })({ ...data, journalId: createdJournal.id });
      //   }),
      // );

      return createdSalesInvoice;
    });
  });
