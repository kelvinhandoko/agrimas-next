import { type GetAllcustomerQuery } from "@/model/customer.model";
import { type Prisma } from "@prisma/client";

import { type CustomerRepository } from "@/server/customer/customer.repository";

export const getAllCustomerUseCase =
  <S extends Prisma.CustomerInclude>(customerRepo: CustomerRepository) =>
  async (query: GetAllcustomerQuery<S>) => {
    const data = await customerRepo.getAll({
      ...query,
      include: {},
    });

    return data;
  };
