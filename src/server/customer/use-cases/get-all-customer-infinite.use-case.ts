import { type CursorQuery } from "@/server/common";
import { type CustomerRepository } from "@/server/customer/customer.repository";

export const getAllCustomerInfiniteUseCase =
  (customerRepo: CustomerRepository) => async (query: CursorQuery) => {
    const data = await customerRepo.getAllInfinite({
      ...query,
    });

    return data;
  };
