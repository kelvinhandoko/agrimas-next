import { type GetAllProductQuery } from "@/model/product.model";

import { type ProductRepository } from "@/server/product/product.repository";

export const getAllProductUseCase =
  (productRepo: ProductRepository) => async (query: GetAllProductQuery) => {
    return await productRepo.getPaginated(query);
  };
