import { getAllProductQuerySchema } from "@/model/product.model";
import { companyProcedure } from "@/trpc/trpc";

import { ProductRepository } from "@/server/product/product.repository";
import { getInfiniteProductUseCase } from "@/server/product/use-cases/get-product-infinite.use-case";

export const getInfiniteProductController = companyProcedure
  .input(getAllProductQuerySchema)
  .query(async ({ ctx, input }) => {
    const productRepo = new ProductRepository(ctx.db);
    return await getInfiniteProductUseCase(productRepo)({
      ...input,
      companyId: ctx.session.user.companyId,
    });
  });
