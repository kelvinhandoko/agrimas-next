import { supplierPayloadSchema } from "@/model/supplier.model";
import { companyProcedure } from "@/trpc/trpc";

import { SupplierRepository } from "@/server/supplier/supplier.repository";
import { createSupplierUseCase } from "@/server/supplier/use-cases/create-supplier.use-case";

export const createSupplierController = companyProcedure
  .input(supplierPayloadSchema)
  .mutation(async ({ ctx, input }) => {
    const supplierRepo = new SupplierRepository(ctx.db);
    const createSuppier = createSupplierUseCase(supplierRepo);
    return await createSuppier({
      ...input,
      companyId: ctx.session.user.companyId,
    });
  });
