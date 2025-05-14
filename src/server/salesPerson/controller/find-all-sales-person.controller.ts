import { companyProcedure } from "@/trpc/trpc";

import { paginatedQuery } from "@/server/common";
import { SalesPersonRepository } from "@/server/salesPerson/sales.repository";
import { findAllSalesPersonUseCase } from "@/server/salesPerson/use-cases/find-all-sales-person.use-case";

export const findAllSalesController = companyProcedure
  .input(paginatedQuery)
  .query(async ({ ctx, input }) => {
    const salesRepo = new SalesPersonRepository(ctx.db);
    return await findAllSalesPersonUseCase(salesRepo)({
      ...input,
      companyId: ctx.session.user.companyId,
    });
  });
