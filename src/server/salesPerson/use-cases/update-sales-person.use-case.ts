import { type SalesPersonPayload } from "@/model/salesPerson.model";
import { serverErrorFormatter } from "@/utils/formatter/errorFormatter";

import { type SalesPersonRepository } from "@/server/salesPerson/sales.repository";

export const updateSalesPersonUseCase =
  (salesRepo: SalesPersonRepository) => async (payload: SalesPersonPayload) => {
    const isExist = await salesRepo.findDetail({
      by: "id",
      identifier: payload.id!,
      companyId: payload.companyId,
    });

    if (!isExist) {
      serverErrorFormatter("NOT_FOUND", "Sales ini tidak ditemukan");
    }

    return await salesRepo.update(payload);
  };
