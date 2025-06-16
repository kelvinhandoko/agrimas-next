import { customerPayloadSchema } from "@/model/customer.model";
import { companyProcedure } from "@/trpc/trpc";

import { CustomerRepository } from "@/server/customer/customer.repository";
import { createCustomerUseCase } from "@/server/customer/use-cases";

export const createCustomerController = companyProcedure
  .input(customerPayloadSchema)
  .mutation(async ({ ctx, input }) => {
    const { alamat, nama } = input;
    const customerRepo = new CustomerRepository(ctx.db);
    const createCustomer = createCustomerUseCase(customerRepo);
    return await createCustomer({
      alamat,
      nama,
      companyId: ctx.session.user.companyId,
    });
  });
