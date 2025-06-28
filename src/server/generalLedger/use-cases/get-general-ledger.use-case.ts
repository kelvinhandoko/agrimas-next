import { type PaginatedGeneralLedgerQuery } from "@/model/general-ledger.model";

import { type GeneralLedgerRepository } from "@/server/generalLedger/repository/general-ledger.repository";

export const getGeneralLedgerUseCase =
  (repo: GeneralLedgerRepository) => async (q: PaginatedGeneralLedgerQuery) =>
    await repo.get(q);
