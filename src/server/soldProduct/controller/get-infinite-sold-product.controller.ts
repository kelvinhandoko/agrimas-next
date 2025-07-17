import { cursoredSoldProductQuerySchema } from "@/model/sold-product.model";
import { companyProcedure } from "@/trpc/trpc";

import { SoldProductRepository } from "@/server/soldProduct/sold-product.repository";
import { getInfiniteSoldProductUseCase } from "@/server/soldProduct/useCases/get-infinite-sold-product.use-case";

export const getInfiniteSoldProductController = companyProcedure
  .input(cursoredSoldProductQuerySchema)
  .query(async ({ ctx, input }) => {
    const soldProductRepo = new SoldProductRepository(ctx.db);
    return await getInfiniteSoldProductUseCase(soldProductRepo)(input);
  });
