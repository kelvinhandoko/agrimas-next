import { type AccountPayload } from "@/model/account.model";

import { type AccountRepository } from "@/server/account/account.repository";
import { type ReportRepository } from "@/server/report/report.repository";

export const createAccountBatchUseCase =
  (accountRepo: AccountRepository, reportRepo: ReportRepository) =>
  async (payload: Array<AccountPayload>) => {
    const data = await accountRepo.createBatch(payload);

    await Promise.all(
      payload.map(async (data) => {
        const dataReport = data.report.map((report) => {
          return {
            companyId: data.companyId,
            report: report,
            accountId: data.id!,
          };
        });
        return await reportRepo.createMany(dataReport);
      }),
    );
    return data;
  };
