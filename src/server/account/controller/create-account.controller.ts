import { type AccountPayload } from "@/server/account/account.model";
import { AccountRepository } from "@/server/account/account.repository";
import { db } from "@/server/db/prisma";
import { ReportRepository } from "@/server/report/report.repository";
import { TransactionService } from "@/server/services/transaction.service";

export class CreateAccountController {
  async execute(payload: AccountPayload) {
    const transactionService = new TransactionService(db);
    return await transactionService.startTransaction(async (tx) => {
      const accountRepo = new AccountRepository(tx);
      const reportRepo = new ReportRepository(tx);
      const data = await accountRepo.create(payload);
      await Promise.all(
        payload.report.map(
          async (report) =>
            await reportRepo.create({
              companyId: data.companyId,
              laporan: report,
              accountId: data.id,
            }),
        ),
      );
      return data;
    });
  }
}
