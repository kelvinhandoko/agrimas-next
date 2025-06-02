import { AccountPayload } from "@/model";
import { TRPCError } from "@trpc/server";

import { AccountRepository } from "@/server/account/account.repository";

export const updateAccountUseCase =
  (repo: AccountRepository) => async (payload: AccountPayload) => {
    const findAccount = await repo.getDetail({ id: payload.id! });
    if (!findAccount)
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Akun tidak ditemukan",
      });
    const account = await repo.update(payload);
    return account;
  };
