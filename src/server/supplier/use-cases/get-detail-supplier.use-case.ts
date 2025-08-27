import { type GetDetailSupplierByIdQuery } from "@/model/supplier.model";
import { TRPCError } from "@trpc/server";

import { type SupplierRepository } from "@/server/supplier/supplier.repository";

export const getDetailByIdSupplierUseCase =
  (supplierRepo: SupplierRepository) =>
  async (query: GetDetailSupplierByIdQuery) => {
    const data = await supplierRepo.getDetailById({
      ...query,
    });
    const totalDebt = await supplierRepo.getTotalDebt(query.id);

    if (!data) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Supplier not found",
      });
    }

    return {
      ...data,
      totalDebt,
    };
  };

export type GetDetailSupplierUseCase = ReturnType<
  Awaited<typeof getDetailByIdSupplierUseCase>
>;
