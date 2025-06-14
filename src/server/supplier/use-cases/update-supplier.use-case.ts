import { type SupplierPayload } from "@/model/supplier.model";
import { TRPCError } from "@trpc/server";

import { type SupplierRepository } from "@/server/supplier/supplier.repository";

export const updateSupplierUseCase =
  (supplierRepo: SupplierRepository) => async (payload: SupplierPayload) => {
    const { alamat, companyId, nama, id, ...others } = payload;
    const findSupplier = await supplierRepo.getDetailById({
      id: id!,
    });

    if (!findSupplier) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "supplier ini tidak ditemukan",
      });
    }
    const isSupplierCreated = await supplierRepo.getUniqueData({
      companyId: payload.companyId,
      nama: payload.nama,
    });
    if (isSupplierCreated && isSupplierCreated.id !== id) {
      throw new TRPCError({
        code: "CONFLICT",
        message: "supplier ini sudah dibuat sebelumnya.",
      });
    }
    return await supplierRepo.update({
      alamat,
      companyId,
      nama,
      ...others,
      id: id!,
    });
  };
