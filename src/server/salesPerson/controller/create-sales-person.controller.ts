import { salesPersonPayloadSchema } from "@/model/salesPerson.model";
import { adminCompanyProcedure } from "@/trpc/trpc";

import { SalesPersonRepository } from "@/server/salesPerson/sales.repository";
import { createSalesPersonUseCase } from "@/server/salesPerson/use-cases/create-sales-person.use-case";
import { TransactionService } from "@/server/services";

export const createSalesPersonController = adminCompanyProcedure
  .input(salesPersonPayloadSchema)
  .mutation(async ({ ctx, input }) => {
    const transactionService = new TransactionService(ctx.db);
    return await transactionService.startTransaction(async (tx) => {
      const salesPersonRepo = new SalesPersonRepository(tx);
      return await createSalesPersonUseCase(salesPersonRepo)({
        ...input,
        companyId: ctx.session.user.companyId,
      });
    });
  });
