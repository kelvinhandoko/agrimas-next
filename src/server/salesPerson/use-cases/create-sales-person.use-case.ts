import { type SalesPersonPayload } from "@/model/salesPerson.model";
import { serverErrorFormatter } from "@/utils/formatter/errorFormatter";

import { type SalesPersonRepository } from "@/server/salesPerson/sales-person.repository";

export const createSalesPersonUseCase =
  (repo: SalesPersonRepository) => async (payload: SalesPersonPayload) => {
    const isExist = await repo.findDetail({
      by: "name",
      identifier: payload.name,
      companyId: payload.companyId,
    });

    if (isExist) {
      serverErrorFormatter("CONFLICT", "Sales ini sudah pernah dibuat");
    }
    return await repo.create(payload);
  };
