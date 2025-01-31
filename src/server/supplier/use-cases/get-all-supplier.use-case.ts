import { type GetAllSupplierQuery } from "@/model/supplier.model";
import { type Prisma } from "@prisma/client";

import { type SupplierRepository } from "@/server/supplier/supplier.repository";

export const getAllSupplierUseCase =
  <S extends Prisma.SupplierInclude>(supplierRepo: SupplierRepository) =>
  async (query: GetAllSupplierQuery<S>) => {
    const data = await supplierRepo.getAll({
      ...query,
      include: {},
    });

    return data;
  };
