import { salesPayloadSchema } from "@/model/sales.model";
import { adminCompanyProcedure } from "@/trpc/trpc";

import { SalesRepository } from "@/server/sales/sales.repository";
import { updateSalesUseCase } from "@/server/sales/use-cases/update-sales.use-case";

export const updateSalesController = adminCompanyProcedure
  .input(salesPayloadSchema)
  .mutation(async ({ ctx, input }) => {
    const salesRepo = new SalesRepository(ctx.db);
    return await updateSalesUseCase(salesRepo)({
      ...input,
      companyId: ctx.session.user.companyId,
    });
  });
