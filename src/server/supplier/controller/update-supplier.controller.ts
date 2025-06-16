import { supplierPayloadSchema } from "@/model/supplier.model";
import { companyProcedure } from "@/trpc/trpc";

import { SupplierRepository } from "@/server/supplier/supplier.repository";
import { updateSupplierUseCase } from "@/server/supplier/use-cases";

export const updateSupplierController = companyProcedure
  .input(supplierPayloadSchema)
  .mutation(async ({ ctx, input }) => {
    const supplierRepo = new SupplierRepository(ctx.db);
    const updateSupplier = updateSupplierUseCase(supplierRepo);
    return await updateSupplier({
      ...input,
      companyId: ctx.session.user.companyId,
    });
  });
