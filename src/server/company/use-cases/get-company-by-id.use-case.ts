import { type CompanyRepository } from "@/server/company/company.repository";
import { TRPCError } from "@trpc/server";

export class GetCompanyByIdUseCase {
  constructor(private _companyRepository: CompanyRepository) {}

  async execute(id: string) {
    const res = await this._companyRepository.findCompanyById(id);
    if (!res) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "company not found",
      });
    }
    return res;
  }
}
