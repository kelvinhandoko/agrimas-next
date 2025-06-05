import { type GetAllcustomerQuery } from "@/model/customer.model";

import { type CustomerRepository } from "@/server/customer/customer.repository";

export const getAllCustomerUseCase =
  (customerRepo: CustomerRepository) => async (query: GetAllcustomerQuery) => {
    const data = await customerRepo.getAll({
      ...query,
    });

    return data;
  };
