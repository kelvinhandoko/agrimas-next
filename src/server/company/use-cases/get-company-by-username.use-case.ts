import { TRPCError } from "@trpc/server";

import { type CompanyRepository } from "@/server/company/company.repository";

export class GetCompanyByUsernameUseCase {
  constructor(private _companyRepository: CompanyRepository) {}

  async execute(username: string) {
    const data = await this._companyRepository.findCompanyByName(username);
    if (!data) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "company not found",
      });
    }
    return data;
  }
}
