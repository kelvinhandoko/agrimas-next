import { type InitialProductPayload } from "@/model/initial-product.model";

import { type InitialProductRepository } from "@/server/initialProduct/initial-product.repository";

export const createInitialProductUseCase =
  (initialProductRepo: InitialProductRepository) =>
  async (payload: InitialProductPayload) => {
    return await initialProductRepo.create(payload);
  };
