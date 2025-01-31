import { GetDetailSupplierByIdQuerySchema } from "@/model/supplier.model";
import { companyProcedure } from "@/trpc/trpc";

import { SupplierRepository } from "@/server/supplier/supplier.repository";
import { getDetailByIdSupplierUseCase } from "@/server/supplier/use-cases/get-detail-supplier.use-case";

export const getDetailSupplierController = companyProcedure
  .input(GetDetailSupplierByIdQuerySchema)
  .query(async ({ ctx, input }) => {
    const supplierRepo = new SupplierRepository(ctx.db);
    const getDetailSupplier = getDetailByIdSupplierUseCase(supplierRepo);
    return getDetailSupplier({
      ...input,
    });
  });
