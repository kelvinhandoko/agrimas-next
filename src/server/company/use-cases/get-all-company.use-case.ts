import { type CompanyRepository } from "@/server/company/company.repository";

export const getUserCompaniesUseCase =
  (companyRepo: CompanyRepository) => async (userId: string) => {
    return await companyRepo.getUserCompanies(userId);
  };
