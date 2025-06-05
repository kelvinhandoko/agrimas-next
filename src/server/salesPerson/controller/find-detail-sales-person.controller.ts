import { findSalesPersonDetailQuerySchema } from "@/model/salesPerson.model";
import { companyProcedure } from "@/trpc/trpc";

import { SalesPersonRepository } from "@/server/salesPerson/sales-person.repository";
import { findDetailSalesPersonUseCase } from "@/server/salesPerson/use-cases/find-detail-sales-person.use-case";

export const findDetailSalesPersonController = companyProcedure
  .input(findSalesPersonDetailQuerySchema)
  .query(async ({ ctx, input }) => {
    const salesRepo = new SalesPersonRepository(ctx.db);
    return await findDetailSalesPersonUseCase(salesRepo)(input);
  });
