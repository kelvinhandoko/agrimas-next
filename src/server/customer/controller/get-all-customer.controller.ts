import { getAllCustomerQuerySchema } from "@/model/customer.model";
import { companyProcedure } from "@/trpc/trpc";

import { CustomerRepository } from "@/server/customer/customer.repository";
import { getAllCustomerUseCase } from "@/server/customer/use-cases";

export const getAllCustomerController = companyProcedure
  .input(getAllCustomerQuerySchema)
  .query(async ({ ctx, input }) => {
    const customerRepo = new CustomerRepository(ctx.db);
    const getAllCustomer = getAllCustomerUseCase(customerRepo);
    return getAllCustomer({ ...input, companyId: ctx.session.user.companyId });
  });
