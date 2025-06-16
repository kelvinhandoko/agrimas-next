import { type UserPayload } from "@/model";
import { TRPCError } from "@trpc/server";

import { type UserRepository } from "@/server/user/user.repository";

export const updateUserUseCase =
  (userRepo: UserRepository) => async (payload: UserPayload) => {
    const findUser = await userRepo.findUserById(payload.id!);
    if (!findUser) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "tidak ditemukan user tersebut",
      });
    }
    return await userRepo.update(payload);
  };
