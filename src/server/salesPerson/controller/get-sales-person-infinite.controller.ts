import { companyProcedure } from "@/trpc/trpc";

import { cursorQuery } from "@/server/common";
import { SalesPersonRepository } from "@/server/salesPerson/sales-person.repository";
import { getSalesPersonInfiniteUseCase } from "@/server/salesPerson/use-cases/find-all-sales-person-infinite.use-case";

export const getSalesPersonInfiniteController = companyProcedure
  .input(cursorQuery)
  .query(async ({ ctx, input }) => {
    const salesRepo = new SalesPersonRepository(ctx.db);
    return await getSalesPersonInfiniteUseCase(salesRepo)({
      ...input,
      companyId: ctx.session.user.companyId,
    });
  });
