import { type FindSalesPersonDetailQuery } from "@/model/salesPerson.model";

import { type SalesPersonRepository } from "@/server/salesPerson/sales.repository";

export const findDetailSalesPersonUseCase =
  (salesRepo: SalesPersonRepository) =>
  async (q: FindSalesPersonDetailQuery) => {
    return await salesRepo.findDetail(q);
  };
