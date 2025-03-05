import { TRPCError } from "@trpc/server";

import { type SalesRepository } from "@/server/sales/sales.repository";

export const deleteSalesUseCase =
  (salesRepo: SalesRepository) => async (id: string) => {
    const isExist = await salesRepo.findById(id);
    if (!isExist) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Sales not found",
      });
    }
    return await salesRepo.delete(id);
  };
