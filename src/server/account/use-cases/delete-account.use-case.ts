import { type AccountRepository } from "@/server/account/account.repository";

export const deleteAccountUseCase =
  (repo: AccountRepository) => async (id: string) => {
    return await repo.delete(id);
  };
