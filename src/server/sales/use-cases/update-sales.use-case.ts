import { type SalesPayload } from "@/model/sales.model";

import { type SalesRepository } from "@/server/sales/sales.repository";

export const updateSalesUseCase =
  (salesRepo: SalesRepository) => async (payload: SalesPayload) => {
    return await salesRepo.update(payload);
  };
