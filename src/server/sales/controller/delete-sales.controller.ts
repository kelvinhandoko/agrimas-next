import { ownerProcedure } from "@/trpc/trpc";
import { z } from "zod";

import { SalesRepository } from "@/server/sales/sales.repository";
import { deleteSalesUseCase } from "@/server/sales/use-cases/delete-sales.use-case";

export const deleteSalesController = ownerProcedure
  .input(z.string())
  .mutation(async ({ ctx, input }) => {
    const salesRepo = new SalesRepository(ctx.db);
    return await deleteSalesUseCase(salesRepo)(input);
  });
