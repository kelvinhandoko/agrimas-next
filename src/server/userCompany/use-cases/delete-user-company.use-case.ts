import { TRPCError } from "@trpc/server";

import { type UserCompanyRepository } from "@/server/userCompany/user-company.repository";

export const deleteUserCompanyUseCase =
  (userCompanyRepo: UserCompanyRepository) => async (id: string) => {
    const findData = await userCompanyRepo.findDetail(id);
    if (!findData) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "tidak ditemukan data tersebut",
      });
    }
    return userCompanyRepo.delete(id);
  };
