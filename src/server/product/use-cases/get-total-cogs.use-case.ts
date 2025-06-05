import { type ProductRepository } from "@/server/product/product.repository";

export const getTotalCOGSUseCase =
  (repo: ProductRepository) =>
  async (payload: Array<{ id: string; quantity: number }>) => {
    const { totalCOGS } = await repo.calculateCOGS(payload);
    return totalCOGS;
  };
