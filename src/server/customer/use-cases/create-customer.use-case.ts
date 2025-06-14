import { type CustomerPayload } from "@/model/customer.model";
import { TRPCError } from "@trpc/server";

import { type CustomerRepository } from "@/server/customer/customer.repository";

export const createCustomerUseCase =
  (customerRepo: CustomerRepository) => async (payload: CustomerPayload) => {
    const { alamat, companyId, nama } = payload;
    const findUniqueCustomer = await customerRepo.getUniqueData({
      companyId,
      nama,
    });

    if (findUniqueCustomer) {
      throw new TRPCError({
        code: "CONFLICT",
        message: "Customer ini sudah pernah dibuat sebelumnya",
      });
    }
    return await customerRepo.create({
      alamat,
      companyId,
      nama,
    });
  };
