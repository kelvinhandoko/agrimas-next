import { type CompanyPayload } from "@/entities/models/company";
import { type CompanyRepository } from "@/infrastructure/repositories/company.repository";
import { TRPCError } from "@trpc/server";

export class CreateCompanyController {
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
