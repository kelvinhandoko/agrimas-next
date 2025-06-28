import { paginatedGeneralLedgerQuerySchema } from "@/model/general-ledger.model";
import { companyProcedure } from "@/trpc/trpc";

import { GeneralLedgerRepository } from "@/server/generalLedger/repository/general-ledger.repository";
import { getGeneralLedgerUseCase } from "@/server/generalLedger/use-cases/get-general-ledger.use-case";

export const getGeneralLedgerController = companyProcedure
  .input(paginatedGeneralLedgerQuerySchema)
  .query(async ({ ctx, input }) => {
    const generalLedgerRepo = new GeneralLedgerRepository(ctx.db);
    return getGeneralLedgerUseCase(generalLedgerRepo)({
      ...input,
      companyId: ctx.session.user.companyId,
    });
  });
