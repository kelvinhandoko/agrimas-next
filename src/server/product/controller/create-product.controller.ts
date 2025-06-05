import { productPayloadSchema } from "@/model/product.model";
import { adminCompanyProcedure } from "@/trpc/trpc";

import { InitialProductRepository } from "@/server/initialProduct/initial-product.repository";
import { createInitialProductUseCase } from "@/server/initialProduct/use-cases/create-initial-product.use-case";
import { ProductRepository } from "@/server/product/product.repository";
import { createProductUseCase } from "@/server/product/use-cases/create-product.use-case";
import { TransactionService } from "@/server/services";

export const createProductController = adminCompanyProcedure
  .input(productPayloadSchema)
  .mutation(async ({ ctx, input }) => {
    const transactionService = new TransactionService(ctx.db);
    return await transactionService.startTransaction(async (tx) => {
      const productRepo = new ProductRepository(tx);
      const initialProductRepo = new InitialProductRepository(tx);

      const product = await createProductUseCase(productRepo)({
        ...input,
        companyId: ctx.session.user.companyId,
      });

      if (input.quantity && input.price) {
        await createInitialProductUseCase(initialProductRepo)({
          ...input,
          companyId: ctx.session.user.companyId,
          productId: product.id,
        });

        return product;
      }
    });
  });
