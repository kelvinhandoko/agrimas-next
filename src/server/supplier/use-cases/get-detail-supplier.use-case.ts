import { type GetDetailSupplierByIdQuery } from "@/model/supplier.model";
import { TRPCError } from "@trpc/server";

import { type SupplierRepository } from "@/server/supplier/supplier.repository";

export const getDetailByIdSupplierUseCase =
  (supplierRepo: SupplierRepository) =>
  async (query: GetDetailSupplierByIdQuery) => {
    const data = await supplierRepo.getDetailById({
      ...query,
    });

    if (!data) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Supplier not found",
      });
    }

    return data;
  };

export type GetDetailSupplierUseCase = ReturnType<
  Awaited<typeof getDetailByIdSupplierUseCase>
>;
