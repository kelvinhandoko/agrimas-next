import { type HandlePurchasedProductQuery } from "@/model/purchased-product.model";

import { type ICreatePurchasedProductUseCase } from "@/server/purchasedProduct/useCases/create-purchase-product.use-case";
import { type IFindPurchasedProductUseCase } from "@/server/purchasedProduct/useCases/find-purchase-product.use-case";
import { type IUpdatePurchasedProductUseCase } from "@/server/purchasedProduct/useCases/update-purchase-product.use-case";

export const handlePurchaseProductOrchestrator =
  (usecases: {
    createPurchaseProduct: ICreatePurchasedProductUseCase;
    updatePurchaseProduct: IUpdatePurchasedProductUseCase;
    findPurchaseProduct: IFindPurchasedProductUseCase;
  }) =>
  async (payload: HandlePurchasedProductQuery) => {
    const {
      createPurchaseProduct,
      findPurchaseProduct,
      updatePurchaseProduct,
    } = usecases;
    const findProduct = await findPurchaseProduct({
      type: "supplier_product",
      identifier: {
        supplierId: payload.supplierId!,
        productId: payload.productId!,
      },
    });

    if (!findProduct) {
      return await createPurchaseProduct({
        supplierId: payload.supplierId!,
        productId: payload.productId!,
        totalPurchase: payload.quantity!,
      });
    }
    return await updatePurchaseProduct({
      id: findProduct.id,
      quantity: payload.quantity!,
      return: payload.return!,
    });
  };

export type IHandlePurchaseProductOrchestrator = ReturnType<
  typeof handlePurchaseProductOrchestrator
>;
