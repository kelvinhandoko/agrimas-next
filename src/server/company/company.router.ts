import { createTRPCRouter } from "@/trpc/trpc";
import { type inferRouterOutputs } from "@trpc/server";

import { createCompanyController } from "@/server/company/controller/create-company-controller";
import { getUserCompaniesController } from "@/server/company/controller/get-user-company.controller";

export const companyRouter = createTRPCRouter({
  create: createCompanyController,
  getUserCompanies: getUserCompaniesController,
});

export type CompanyRouterOutputs = inferRouterOutputs<typeof companyRouter>;
