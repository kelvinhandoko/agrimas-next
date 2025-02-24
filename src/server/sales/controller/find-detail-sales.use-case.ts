import { companyProcedure } from "@/trpc/trpc";
import { z } from "zod";

import { SalesRepository } from "@/server/sales/sales.repository";
import { findDetailSalesUseCase } from "@/server/sales/use-cases/find-detail-sales.use-case";

export const findDetailSalesController = companyProcedure
  .input(z.string())
  .query(async ({ ctx, input }) => {
    const salesRepo = new SalesRepository(ctx.db);
    return await findDetailSalesUseCase(salesRepo)(input);
  });
