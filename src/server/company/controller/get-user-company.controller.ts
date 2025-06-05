import { protectedProcedure } from "@/trpc/trpc";

import { CompanyRepository } from "@/server/company/company.repository";
import { getUserCompaniesUseCase } from "@/server/company/use-cases/get-all-company.use-case";

export const getUserCompaniesController = protectedProcedure.query(
  async ({ ctx }) => {
    const companyRepo = new CompanyRepository(ctx.db);
    const getUserCompanies = getUserCompaniesUseCase(companyRepo);
    return getUserCompanies(ctx.session.user.id);
  },
);
