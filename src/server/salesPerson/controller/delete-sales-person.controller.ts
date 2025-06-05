import { ownerProcedure } from "@/trpc/trpc";
import { z } from "zod";

import { SalesPersonRepository } from "@/server/salesPerson/sales-person.repository";
import { deleteSalesPersonUseCase } from "@/server/salesPerson/use-cases/delete-sales-person.use-case";

export const deleteSalesPersonController = ownerProcedure
  .input(z.string())
  .mutation(async ({ ctx, input }) => {
    const salesRepo = new SalesPersonRepository(ctx.db);
    return await deleteSalesPersonUseCase(salesRepo)(input);
  });
