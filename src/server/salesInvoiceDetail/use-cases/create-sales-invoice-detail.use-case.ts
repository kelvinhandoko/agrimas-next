import { type SalesInvoiceDetailPayload } from "@/model/sales-invoice-detail.model";
import { TRPCError } from "@trpc/server";

import { type ProductRepository } from "@/server/product/product.repository";
import { type SalesInvoiceDetailRepository } from "@/server/salesInvoiceDetail/sales-invoice-detail.repository";

export const createSalesInvoiceDetailUseCase =
  (repos: {
    salesInvoiceDetailRepo: SalesInvoiceDetailRepository;
    productRepo: ProductRepository;
  }) =>
  async (payload: SalesInvoiceDetailPayload) => {
    const { salesInvoiceDetailRepo, productRepo } = repos;
    const { productId, ...rest } = payload;
    const findProduct = await productRepo.findDetail(productId);

    if (!findProduct) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "product tidak ditemukan",
      });
    }

    const updatedProduct = await productRepo.decreaseStock({
      productId: findProduct.id,
      quantity: rest.quantity,
    });

    if (updatedProduct.currentQuantity < 0) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: `stock produk ${updatedProduct.name} tidak mencukupi`,
      });
    }

    return await salesInvoiceDetailRepo.create({
      ...rest,
      productId: findProduct.id,
    });
  };
