import { type GetDetailSupplierByIdQuery } from "@/model/supplier.model";

import { type CustomerRepository } from "@/server/customer/customer.repository";

export const getDetailByIdCustomerUseCase =
  (customerRepo: CustomerRepository) =>
  async (query: GetDetailSupplierByIdQuery) => {
    const data = await customerRepo.getDetailById(query.id);

    return data;
  };
