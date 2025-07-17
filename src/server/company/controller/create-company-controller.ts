import { defaultAccountData } from "@/data/defaultAccountantData";
import { companyPayloadSchema } from "@/model";
import { ownerProcedure } from "@/trpc/trpc";

import { AccountRepository } from "@/server/account";
import { createAccountBatchUseCase } from "@/server/account/use-cases/create-account-batch.use-case";
import { CompanyRepository } from "@/server/company/company.repository";
import { CreateCompanyUseCase } from "@/server/company/use-cases";
import { DefaultAccountRepository } from "@/server/defaultAccount/default-account.repository";
import { createBulkDefaultAccountUseCase } from "@/server/defaultAccount/use-cases/create-bulk-default-account.use-case";
import { GroupAccountRepository } from "@/server/groupAccount/group-account.repository";
import { createGroupAccountUseCase } from "@/server/groupAccount/use-cases/create-group-account.use-case";
import { PaymentMethodRepository } from "@/server/paymentMethod/payment-method.repository";
import { createPaymentMethodUseCase } from "@/server/paymentMethod/use-cases/create-payment-method.use-case";
import { TransactionService } from "@/server/services";

export const createCompanyController = ownerProcedure
  .input(companyPayloadSchema)
  .mutation(async ({ input, ctx }) => {
    const transactionService = new TransactionService(ctx.db);

    return transactionService.startTransaction(async (tx) => {
      const accountRepo = new AccountRepository(tx);
      const groupAccountRepo = new GroupAccountRepository(tx);
      const companyRepo = new CompanyRepository(tx);
      const defaultAccountRepo = new DefaultAccountRepository(tx);
      const paymentMethodRepo = new PaymentMethodRepository(tx);
      const createCompany = new CreateCompanyUseCase(companyRepo);

      const companyData = await createCompany.execute({
        ...input,
        userId: ctx.session.user.id,
      });

      const createGroupAccount = createGroupAccountUseCase(groupAccountRepo);
      const createAccount = createAccountBatchUseCase(accountRepo);

      const createDefaultAccount =
        createBulkDefaultAccountUseCase(defaultAccountRepo);

      const createPaymentMethod = createPaymentMethodUseCase(paymentMethodRepo);

      // Use Promise.all to handle group account creation
      await Promise.all(
        defaultAccountData.map(async (groupAccount) => {
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
          const defaultData = accountsWithGroupAccount.filter(
            (data) => Boolean(data.category) && data.id,
          );

          const paymentMethodData = accountsWithGroupAccount.filter(
            (data) => data.isPaymentMethod,
          );
          await Promise.all(
            paymentMethodData.map(async (data) => {
              await createPaymentMethod({
                name: data.name,
                companyId: companyData.id,
                initialAmount: 0,
              });
            }),
          );
          await createDefaultAccount(
            defaultData.map((data) => {
              return {
                companyId: data.companyId,
                category: data.category!,
                accountId: data.id!,
              };
            }),
          );
        }),
      );

      return companyData;
    });
  });
