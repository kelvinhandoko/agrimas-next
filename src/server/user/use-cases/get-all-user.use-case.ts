import { type GetAllSupplierQuery } from "@/model/supplier.model";
import { type Prisma } from "@prisma/client";

import { type UserRepository } from "@/server/user/user.repository";

export const getAllUserUseCase =
  <S extends Prisma.UserInclude>(userRepo: UserRepository) =>
  async (query: GetAllSupplierQuery<S>) => {
    const data = await userRepo.getAll({
      ...query,
      include: {},
    });

    return data;
  };
