import { type GetAllPurchaseQuery } from "@/model/purchase.model";
import { type Prisma } from "@prisma/client";

import { type PurchaseRepository } from "@/server/purchase/purchase.repository";

export const getAllPurchaseUseCase =
  (purchaseRepo: PurchaseRepository) =>
  async <T extends Prisma.PurchaseInclude>(query: GetAllPurchaseQuery<T>) => {
    return await purchaseRepo.findMany(query);
  };
