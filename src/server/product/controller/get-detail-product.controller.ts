import { companyProcedure } from "@/trpc/trpc";
import { z } from "zod";

import { ProductRepository } from "@/server/product/product.repository";
import { getDetailProductUseCase } from "@/server/product/use-cases/get-detail-product.use-case";

export const getDetailProductController = companyProcedure
  .input(z.string())
  .query(async ({ ctx, input }) => {
    const productRepo = new ProductRepository(ctx.db);
    return await getDetailProductUseCase(productRepo)(input);
  });
