import { type GetDetailSupplierByIdQuery } from "@/model/supplier.model";

import { type SupplierRepository } from "@/server/supplier/supplier.repository";

export const getDetailByIdSupplierUseCase =
  (supplierRepo: SupplierRepository) =>
  async (query: GetDetailSupplierByIdQuery) => {
    const data = await supplierRepo.getDetailById({
      ...query,
    });

    return data;
  };
