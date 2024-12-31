import { createTRPCRouter } from "@/trpc/trpc";
import { type inferRouterOutputs } from "@trpc/server";

import { createCompanyController } from "@/server/company/controller/create-company-controller";

export const companyRouter = createTRPCRouter({
  create: createCompanyController,
});

export type CompanyRouterOutputs = inferRouterOutputs<typeof companyRouter>;
