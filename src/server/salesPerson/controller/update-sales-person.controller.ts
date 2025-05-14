import { salesPersonPayloadSchema } from "@/model/salesPerson.model";
import { adminCompanyProcedure } from "@/trpc/trpc";

import { SalesPersonRepository } from "@/server/salesPerson/sales.repository";
import { updateSalesPersonUseCase } from "@/server/salesPerson/use-cases/update-sales-person.use-case";
import { TransactionService } from "@/server/services";

export const updateSalesPersonController = adminCompanyProcedure
  .input(salesPersonPayloadSchema)
  .mutation(async ({ ctx, input }) => {
    const transactionService = new TransactionService(ctx.db);
    return await transactionService.startTransaction(async (tx) => {
      const salesRepo = new SalesPersonRepository(tx);
      return await updateSalesPersonUseCase(salesRepo)({
        ...input,
        companyId: ctx.session.user.companyId,
      });
    });
  });
