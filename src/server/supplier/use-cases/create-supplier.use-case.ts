import { type SupplierPayload } from "@/model/supplier.model";
import { TRPCError } from "@trpc/server";

import { type SupplierRepository } from "@/server/supplier/supplier.repository";

export const createSupplierUseCase =
  (supplierRepo: SupplierRepository) => async (payload: SupplierPayload) => {
    const { alamat, companyId, nama } = payload;
    const findUniqueSupplier = await supplierRepo.getUniqueData({
      companyId,
      nama,
    });

    if (findUniqueSupplier) {
      throw new TRPCError({
        code: "CONFLICT",
        message: "supplier ini sudah pernah dibuat sebelumnya",
      });
    }
    return await supplierRepo.create({
      alamat,
      companyId,
      nama,
    });
  };
