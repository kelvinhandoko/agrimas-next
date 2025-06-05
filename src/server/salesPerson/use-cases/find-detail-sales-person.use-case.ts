import { type FindSalesPersonDetailQuery } from "@/model/salesPerson.model";

import { type SalesPersonRepository } from "@/server/salesPerson/sales-person.repository";

export const findDetailSalesPersonUseCase =
  (salesRepo: SalesPersonRepository) =>
  async (q: FindSalesPersonDetailQuery) => {
    return await salesRepo.findDetail(q);
  };
