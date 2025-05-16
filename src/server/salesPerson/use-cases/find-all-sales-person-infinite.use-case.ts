import { type CursorQuery } from "@/server/common";
import { type SalesPersonRepository } from "@/server/salesPerson/sales-person.repository";

export const getSalesPersonInfiniteUseCase =
  (salesRepo: SalesPersonRepository) => async (q: CursorQuery) => {
    return await salesRepo.getInfinite(q);
  };
