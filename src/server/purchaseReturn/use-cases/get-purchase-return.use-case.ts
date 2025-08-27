import { type PaginatedPurchaseReturnQuery } from "@/model/purchase-return.model";

import { type PurchaseReturnRepository } from "@/server/purchaseReturn/purchase-return.repository";

export const getPurchaseReturnUseCase =
  (repo: PurchaseReturnRepository) =>
  async (query: PaginatedPurchaseReturnQuery) => {
    return repo.get(query);
  };
