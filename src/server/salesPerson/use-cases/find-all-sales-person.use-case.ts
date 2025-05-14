import { type PaginatedQuery } from "@/server/common";
import { type SalesPersonRepository } from "@/server/salesPerson/sales-person.repository";

export const findAllSalesPersonUseCase =
  (salesRepo: SalesPersonRepository) => async (q: PaginatedQuery) => {
    return await salesRepo.findAll(q);
  };
