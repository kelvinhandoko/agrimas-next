import { type GetDetailSupplierByIdQuery } from "@/model/supplier.model";
import { type Prisma } from "@prisma/client";

import { type SupplierRepository } from "@/server/supplier/supplier.repository";

export const getDetailByIdSupplierUseCase =
  <S extends Prisma.SupplierInclude>(supplierRepo: SupplierRepository) =>
  async (query: GetDetailSupplierByIdQuery<S>) => {
    const data = await supplierRepo.getDetailById({
      ...query,
      include: {},
    });

    return data;
  };
