import { salesPayloadSchema } from "@/model/sales.model";
import { adminCompanyProcedure } from "@/trpc/trpc";
import { TRPCError } from "@trpc/server";

import { SalesRepository } from "@/server/sales/sales.repository";
import { createSalesUseCase } from "@/server/sales/use-cases/create-sales.use-case";
import { findSalesByNameUseCase } from "@/server/sales/use-cases/find-sales-by-name.use-case";

export const createSalesController = adminCompanyProcedure
  .input(salesPayloadSchema)
  .mutation(async ({ ctx, input }) => {
    const salesRepo = new SalesRepository(ctx.db);
    const findSales = await findSalesByNameUseCase(salesRepo)({
      name: input.name,
      companyId: ctx.session.user.companyId,
    });
    if (findSales) {
      throw new TRPCError({
        code: "CONFLICT",
        message: "this sales already exist",
      });
    }
    return await createSalesUseCase(salesRepo)({
      ...input,
      companyId: ctx.session.user.companyId,
    });
  });
