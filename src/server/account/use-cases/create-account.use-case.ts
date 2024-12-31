import { type AccountPayload } from "@/model/account.model";

import { type AccountRepository } from "@/server/account/account.repository";
import { type ReportRepository } from "@/server/report/report.repository";

export const createAccountUseCase =
  (accountRepo: AccountRepository, reportRepo: ReportRepository) =>
  async (payload: AccountPayload) => {
    const { report, ...otherPayload } = payload;
    const data = await accountRepo.create(otherPayload);
    await Promise.all(
      payload.report.map(
        async (report) =>
          await reportRepo.create({
            companyId: data.companyId,
            report: report,
            accountId: data.id,
          }),
      ),
    );
    return data;
  };
