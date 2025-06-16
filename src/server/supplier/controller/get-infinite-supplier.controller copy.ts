import { cursoredSupplierQuerySchema } from "@/model/supplier.model";
import { companyProcedure } from "@/trpc/trpc";

import { SupplierRepository } from "@/server/supplier/supplier.repository";
import { getInfiniteSupplierUseCase } from "@/server/supplier/use-cases/get-infinite-supplier.use-case";

export const getInfiniteSupplierController = companyProcedure
  .input(cursoredSupplierQuerySchema)
  .query(async ({ ctx, input }) => {
    const supplierRepo = new SupplierRepository(ctx.db);
    const getAllSupplier = getInfiniteSupplierUseCase(supplierRepo);
    return getAllSupplier({ ...input, companyId: ctx.session.user.companyId });
  });
