import { type AccountPayload } from "@/server/account/account.model";
import { AccountRepository } from "@/server/account/account.repository";
import { db } from "@/server/db/prisma";
import { ReportRepository } from "@/server/report/report.repository";
import { TransactionService } from "@/server/services/transaction.service";
import { TRPCError } from "@trpc/server";

export class UpdateAccountController {
  async execute(payload: AccountPayload) {
    const transactionService = new TransactionService(db);
    return await transactionService.startTransaction(async (tx) => {
      const accountRepo = new AccountRepository(tx);
      const reportRepo = new ReportRepository(tx);
      const data = await accountRepo.getDetail({
        id: payload.id!,
        include: { report: true },
      });
      if (!data) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "akun tidak ditemukan",
        });
      }

      const reportToBeAdded = payload.report.filter(
        (report) => !data.report.some((dr) => dr.report === report),
      );

      const reportToBeDeleted = data.report.filter(
        (dr) => !payload.report.includes(dr.report),
      );

      await Promise.all([
        ...reportToBeAdded.map(
          async (report) =>
            await reportRepo.create({
              accountId: data.id,
              companyId: data.companyId,
              report,
            }),
        ),
        ...reportToBeDeleted.map(async (dr) => await reportRepo.delete(dr.id)),
      ]);
      return data;
    });
  }
}
