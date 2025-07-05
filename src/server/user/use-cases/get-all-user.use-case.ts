import { type GetAllUserQuery } from "@/model";

import { type UserRepository } from "@/server/user/user.repository";

export const getAllUserUseCase =
  (userRepo: UserRepository) => async (query: GetAllUserQuery) => {
    const data = await userRepo.getAll({
      ...query,
    });

    return data;
  };
