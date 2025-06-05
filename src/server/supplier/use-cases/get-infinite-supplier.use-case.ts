import { type CursoredSupplierQuery } from "@/model/supplier.model";

import { type SupplierRepository } from "@/server/supplier/supplier.repository";

export const getInfiniteSupplierUseCase =
  (supplierRepo: SupplierRepository) =>
  async (query: CursoredSupplierQuery) => {
    const data = await supplierRepo.getInfinite({
      ...query,
    });

    return data;
  };
