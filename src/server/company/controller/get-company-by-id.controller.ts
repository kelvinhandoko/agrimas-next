import { type CompanyRepository } from "@/server/company/company.repository";

export class GetCompanyByIdController {
  constructor(private _companyRepository: CompanyRepository) {}

  async execute(id: string) {
    return this._companyRepository.findCompanyById(id);
  }
}
