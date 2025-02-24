import { type SalesRepository } from "@/server/sales/sales.repository";

export const findAllSalesUseCase = (salesRepo: SalesRepository) => async () => {
  return await salesRepo.findAll();
};
