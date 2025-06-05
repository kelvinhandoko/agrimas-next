import { customerPayloadSchema } from "@/model/customer.model";
import { companyProcedure } from "@/trpc/trpc";

import { CustomerRepository } from "@/server/customer/customer.repository";
import { updateCustomerUseCase } from "@/server/customer/use-cases";

export const updateCustomerController = companyProcedure
  .input(customerPayloadSchema)
  .mutation(async ({ ctx, input }) => {
    const { alamat, nama, id } = input;
    const customerRepo = new CustomerRepository(ctx.db);
    const updateCustomer = updateCustomerUseCase(customerRepo);
    return await updateCustomer({
      alamat,
      nama,
      id,
      companyId: ctx.session.user.companyId,
    });
  });
