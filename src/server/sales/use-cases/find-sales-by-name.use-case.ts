import { type FindSalesByNameQuery } from "@/model/sales.model";

import { type SalesRepository } from "@/server/sales/sales.repository";

export const findSalesByNameUseCase =
  (salesRepo: SalesRepository) => async (query: FindSalesByNameQuery) => {
    return await salesRepo.findByName(query);
  };
