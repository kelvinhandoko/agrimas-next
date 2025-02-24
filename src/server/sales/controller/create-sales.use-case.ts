import { salesPayloadSchema } from "@/model/sales.model";
import { adminCompanyProcedure } from "@/trpc/trpc";

import { SalesRepository } from "@/server/sales/sales.repository";
import { createSalesUseCase } from "@/server/sales/use-cases/create-sales.use-case";

export const createSalesController = adminCompanyProcedure
  .input(salesPayloadSchema)
  .mutation(async ({ ctx, input }) => {
    const salesRepo = new SalesRepository(ctx.db);
    return await createSalesUseCase(salesRepo)({
      ...input,
      companyId: ctx.session.user.companyId,
    });
  });
