import { defaultGroupAccountData } from "@/data/defaultAccountantData";
import { companyPayloadSchema } from "@/model";
import { ownerProcedure } from "@/trpc/trpc";

import { AccountRepository } from "@/server/account";
import { createAccountBatchUseCase } from "@/server/account/use-cases/create-account-batch.use-case";
import { CompanyRepository } from "@/server/company/company.repository";
import { CreateCompanyUseCase } from "@/server/company/use-cases";
import { GroupAccountRepository } from "@/server/groupAccount";
import { createGroupAccountUseCase } from "@/server/groupAccount/use-cases/create-group-account.use-case";
import { ReportRepository } from "@/server/report/report.repository";
import { TransactionService } from "@/server/services";

export const createCompanyController = ownerProcedure
  .input(companyPayloadSchema)
  .mutation(async ({ input, ctx }) => {
    const transactionService = new TransactionService(ctx.db);

    return transactionService.startTransaction(async (tx) => {
      const accountRepo = new AccountRepository(tx);
      const groupAccountRepo = new GroupAccountRepository(tx);
      const companyRepo = new CompanyRepository(tx);
      const reportRepo = new ReportRepository(tx);
      const createCompany = new CreateCompanyUseCase(companyRepo);

      const companyData = await createCompany.execute({
        ...input,
        userId: ctx.session.user.id!,
      });

      const createGroupAccount = createGroupAccountUseCase(groupAccountRepo);
      const createAccount = createAccountBatchUseCase(accountRepo, reportRepo);

      // Use Promise.all to handle group account creation
      await Promise.all(
        defaultGroupAccountData.map(async (groupAccount) => {
          const { accounts, ...groupAccountRelated } = groupAccount;

          const groupAccountData = await createGroupAccount({
            ...groupAccountRelated,
            companyId: companyData.id,
          });
          const accountsWithGroupAccount = accounts.map((acc) => {
            return {
              ...acc,
              groupAccountId: groupAccountData.id,
              companyId: companyData.id,
            };
          });
          await createAccount(accountsWithGroupAccount);
        }),
      );

      return companyData;
    });
  });
