import { productPayloadSchema } from "@/model/product.model";
import { adminCompanyProcedure } from "@/trpc/trpc";

import { ProductRepository } from "@/server/product/product.repository";
import { updateProductUseCase } from "@/server/product/use-cases/update-product.use-case";
import { TransactionService } from "@/server/services";

export const updateProductController = adminCompanyProcedure
  .input(productPayloadSchema)
  .mutation(async ({ ctx, input }) => {
    const transactionService = new TransactionService(ctx.db);
    return await transactionService.startTransaction(async (tx) => {
      const productRepo = new ProductRepository(tx);

      const product = await updateProductUseCase(productRepo)({
        ...input,
        companyId: ctx.session.user.companyId,
      });

      return product;
    });
  });
