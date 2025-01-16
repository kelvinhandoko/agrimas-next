import { getAllSupplierQuerySchema } from "@/model/supplier.model";
import { companyProcedure } from "@/trpc/trpc";

import { SupplierRepository } from "@/server/supplier/supplier.repository";
import { getAllSupplierUseCase } from "@/server/supplier/use-cases/get-all-supplier.use-case";

export const getAllSupplierController = companyProcedure
  .input(getAllSupplierQuerySchema)
  .query(async ({ ctx, input }) => {
    const supplierRepo = new SupplierRepository(ctx.db);
    const getAllSupplier = getAllSupplierUseCase(supplierRepo);
    return getAllSupplier({ ...input, companyId: ctx.session.user.companyId });
  });
