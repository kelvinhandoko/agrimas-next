import { type HandleSoldProductQuery } from "@/model/sold-product.model";

import { type ICreateSoldProductUseCase } from "@/server/soldProduct/useCases/create-sold-product.use-case";
import { type IFindSoldProductUseCase } from "@/server/soldProduct/useCases/find-sold-product.use-case";
import { type IUpdateSoldProductUseCase } from "@/server/soldProduct/useCases/update-sold-product.use-case";

export const handleSoldProductOrchestrator =
  (usecases: {
    createSoldProduct: ICreateSoldProductUseCase;
    updateSoldProduct: IUpdateSoldProductUseCase;
    findSoldProduct: IFindSoldProductUseCase;
  }) =>
  async (payload: HandleSoldProductQuery) => {
    const { createSoldProduct, findSoldProduct, updateSoldProduct } = usecases;
    const findProduct = await findSoldProduct({
      type: "customer_product",
      identifier: {
        customerId: payload.customerId!,
        productId: payload.productId!,
      },
    });

    if (!findProduct) {
      return await createSoldProduct({
        customerId: payload.customerId!,
        productId: payload.productId!,
        totalSold: payload.quantity!,
      });
    }
    return await updateSoldProduct({
      id: findProduct.id,
      quantity: payload.quantity!,
      return: payload.return!,
    });
  };
