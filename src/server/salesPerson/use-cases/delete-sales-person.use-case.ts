import { serverErrorFormatter } from "@/utils/formatter/errorFormatter";

import { type SalesPersonRepository } from "@/server/salesPerson/sales-person.repository";

export const deleteSalesPersonUseCase =
  (salesRepo: SalesPersonRepository) => async (id: string) => {
    const data = await salesRepo.delete(id);
    if (!data) {
      serverErrorFormatter("NOT_FOUND", "Sales tidak ditemukan");
    }
    return data;
  };
