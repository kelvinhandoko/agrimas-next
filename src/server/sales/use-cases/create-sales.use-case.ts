import { type SalesPayload } from "@/model/sales.model";

import { type SalesRepository } from "@/server/sales/sales.repository";

export const createSalesUseCase =
  (salesRepo: SalesRepository) => async (payload: SalesPayload) => {
    return await salesRepo.create(payload);
  };
