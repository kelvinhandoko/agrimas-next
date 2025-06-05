import { type EmployeePayload } from "@/model";
import { hashPassword } from "@/utils/passwordHandler";
import { TRPCError } from "@trpc/server";

import { type UserRepository } from "@/server/user/user.repository";
import { type UserCompanyRepository } from "@/server/userCompany/user-company.repository";

export const createUserUseCase =
  (userRepo: UserRepository, userCompanyRepo: UserCompanyRepository) =>
  async (payload: EmployeePayload) => {
    const { companyId, ...others } = payload;
    const findUser = await userRepo.findUserCompany({
      companyId: payload.companyId,
      name: payload.username,
    });
    if (findUser) {
      throw new TRPCError({
        code: "CONFLICT",
        message: "user ini sudah dibuat sebelumnya",
      });
    }
    const createUser = await userRepo.create({
      ...others,
      password: await hashPassword(others.password),
    });
    await userCompanyRepo.create({ companyId, userId: createUser.id });
    return createUser;
  };
