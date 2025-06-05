import { companyProcedure } from "@/trpc/trpc";

import { cursorQuery } from "@/server/common";
import { CustomerRepository } from "@/server/customer/customer.repository";
import { getAllCustomerInfiniteUseCase } from "@/server/customer/use-cases/get-all-customer-infinite.use-case";

export const getAllCustomerInfiniteController = companyProcedure
  .input(cursorQuery)
  .query(async ({ ctx, input }) => {
    const customerRepo = new CustomerRepository(ctx.db);
    const getAllCustomer = getAllCustomerInfiniteUseCase(customerRepo);
    return getAllCustomer({ ...input, companyId: ctx.session.user.companyId });
  });
