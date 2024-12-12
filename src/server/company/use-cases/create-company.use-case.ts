import { type CompanyPayload } from "@/model/company.model";
import { TRPCError } from "@trpc/server";

import { type CompanyRepository } from "@/server/company/company.repository";

export class CreateCompanyUseCase {
  constructor(private _companyRepository: CompanyRepository) {}

  async execute(payload: CompanyPayload) {
    const company = await this._companyRepository.findCompanyByName(
      payload.name,
    );
    if (company) {
      throw new TRPCError({
        code: "CONFLICT",
        message: "company already exists",
      });
    }
    return this._companyRepository.create(payload);
  }
}
