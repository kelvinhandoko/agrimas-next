import { type DefaultAccountRepository } from "@/server/defaultAccount/default-account.repository";

export const getDefaultAccountUseCase =
  (defaultAccountRepo: DefaultAccountRepository) =>
  async (companyId: string) => {
    const defaultAccount = await defaultAccountRepo.getByCompany(companyId);
    return defaultAccount;
  };
