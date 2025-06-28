import { GetDetailCustomerByIdQuerySchema } from "@/model/customer.model";
import { companyProcedure } from "@/trpc/trpc";

import { CustomerRepository } from "@/server/customer/customer.repository";
import { getDetailByIdCustomerUseCase } from "@/server/customer/use-cases";

export const getDetailCustomerController = companyProcedure
  .input(GetDetailCustomerByIdQuerySchema)
  .query(async ({ ctx, input }) => {
    const customerRepo = new CustomerRepository(ctx.db);
    const getDetailCustomer = getDetailByIdCustomerUseCase(customerRepo);
    return getDetailCustomer(input);
  });
