import { getAllProductQuerySchema } from "@/model/product.model";
import { companyProcedure } from "@/trpc/trpc";

import { ProductRepository } from "@/server/product/product.repository";
import { getAllProductUseCase } from "@/server/product/use-cases/get-all-product.use-case";

export const getAllProductController = companyProcedure
  .input(getAllProductQuerySchema)
  .query(async ({ ctx, input }) => {
    const productRepo = new ProductRepository(ctx.db);
    return await getAllProductUseCase(productRepo)({
      ...input,
      companyId: ctx.session.user.companyId,
    });
  });
