import { type ProductRepository } from "@/server/product/product.repository";

export const getDetailProductUseCase =
  (productRepo: ProductRepository) => async (id: string) => {
    return await productRepo.findDetail(id);
  };

export type GetDetailProductUseCase = ReturnType<
  Awaited<typeof getDetailProductUseCase>
>;
