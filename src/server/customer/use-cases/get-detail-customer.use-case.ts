import { type GetDetailSupplierByIdQuery } from "@/model/supplier.model";
import { type Prisma } from "@prisma/client";

import { type CustomerRepository } from "@/server/customer/customer.repository";

export const getDetailByIdCustomerUseCase =
  <S extends Prisma.CustomerInclude>(customerRepo: CustomerRepository) =>
  async (query: GetDetailSupplierByIdQuery<S>) => {
    const data = await customerRepo.getDetailById({
      ...query,
      include: {},
    });

    return data;
  };
