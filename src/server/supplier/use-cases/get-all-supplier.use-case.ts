import { type PaginatedSupplierQuery } from "@/model/supplier.model";

import { type SupplierRepository } from "@/server/supplier/supplier.repository";

export const getAllSupplierUseCase =
  (supplierRepo: SupplierRepository) =>
  async (query: PaginatedSupplierQuery) => {
    const data = await supplierRepo.get({
      ...query,
    });

    return data;
  };
