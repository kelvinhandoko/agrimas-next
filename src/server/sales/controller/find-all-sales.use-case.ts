import { companyProcedure } from "@/trpc/trpc";

import { SalesRepository } from "@/server/sales/sales.repository";
import { findAllSalesUseCase } from "@/server/sales/use-cases/find-all-sales.use-case";

export const findAllSalesController = companyProcedure.query(
  async ({ ctx }) => {
    const salesRepo = new SalesRepository(ctx.db);
    return await findAllSalesUseCase(salesRepo)();
  },
);
