import { type GeneralLedgerPayload } from "@/model/general-ledger.model";

import { type GeneralLedgerRepository } from "@/server/generalLedger/repository/general-ledger.repository";

export const createGeneralLedgerUseCase =
  (generalLedgerRepo: GeneralLedgerRepository) =>
  async (payload: GeneralLedgerPayload) => {
    const getLastData = await generalLedgerRepo.findLatestData(
      payload.accountId,
    );
    const runningBalance = getLastData?.runningBalance ?? 0 + payload.amount;
    return await generalLedgerRepo.create({ ...payload, runningBalance });
  };

export type CreateGeneralLedgerUseCase = ReturnType<
  typeof createGeneralLedgerUseCase
>;
