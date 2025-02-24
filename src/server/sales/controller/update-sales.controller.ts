import { salesPayloadSchema } from "@/model/sales.model";
import { adminCompanyProcedure } from "@/trpc/trpc";
import { TRPCError } from "@trpc/server";

import { SalesRepository } from "@/server/sales/sales.repository";
import { findDetailSalesUseCase } from "@/server/sales/use-cases/find-detail-sales.use-case";
import { updateSalesUseCase } from "@/server/sales/use-cases/update-sales.use-case";

export const updateSalesController = adminCompanyProcedure
  .input(salesPayloadSchema)
  .mutation(async ({ ctx, input }) => {
    const salesRepo = new SalesRepository(ctx.db);
    const findSales = await findDetailSalesUseCase(salesRepo)(input.id!);
    if (!findSales) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "sales not found",
      });
    }

    return await updateSalesUseCase(salesRepo)({
      ...input,
      companyId: ctx.session.user.companyId,
    });
  });
