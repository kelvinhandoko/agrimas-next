import { TRPCError } from "@trpc/server";

import { type UserRepository } from "@/server/user/user.repository";

export const deleteUserUseCase =
  (userRepo: UserRepository) => async (id: string) => {
    const findUser = await userRepo.findUserById(id);
    if (!findUser) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "user tidak ditemukan",
      });
    }
    const deleteUser = await userRepo.delete(id);
    return deleteUser;
  };
