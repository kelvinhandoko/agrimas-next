import { type CustomerPayload } from "@/model/customer.model";
import { TRPCError } from "@trpc/server";

import { type CustomerRepository } from "@/server/customer/customer.repository";

export const updateCustomerUseCase =
  (customerRepo: CustomerRepository) => async (payload: CustomerPayload) => {
    const { alamat, companyId, nama, id } = payload;
    const findCustomer = await customerRepo.getDetailById(id!);

    if (!findCustomer) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "customer ini tidak ditemukan",
      });
    }
    return await customerRepo.update({
      alamat,
      companyId,
      nama,
      id: id!,
    });
  };
