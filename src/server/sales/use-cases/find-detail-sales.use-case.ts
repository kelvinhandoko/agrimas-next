import { type SalesRepository } from "@/server/sales/sales.repository";

export const findDetailSalesUseCase =
  (salesRepo: SalesRepository) => async (id: string) => {
    return await salesRepo.findById(id);
  };
