import { type GetDetailSupplierByIdQuery } from "@/model/supplier.model";
import { TRPCError } from "@trpc/server";

import { type CustomerRepository } from "@/server/customer/customer.repository";

export const getDetailByIdCustomerUseCase =
  (customerRepo: CustomerRepository) =>
  async (query: GetDetailSupplierByIdQuery) => {
    const data = await customerRepo.getDetailById(query.id);
    if (!data) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "customer tidak ditemukan",
      });
    }
    return data;
  };

export type GetDetailByIdCustomerUseCase = ReturnType<
  typeof getDetailByIdCustomerUseCase
>;
