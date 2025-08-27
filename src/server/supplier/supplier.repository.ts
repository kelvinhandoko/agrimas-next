import {
  type CursoredSupplierQuery,
  type GetAllSupplierQuery,
  type GetDetailSupplierByIdQuery,
  type GetUniqueSupplierQuery,
  type PaginatedSupplierQuery,
  type SupplierPayload,
} from "@/model/supplier.model";
import { type Prisma } from "@prisma/client";

import { BaseRepository } from "@/server/common/repository/BaseRepository";

export class SupplierRepository extends BaseRepository {
  async create(payload: SupplierPayload) {
    return await this._db.supplier.create({
      data: payload,
    });
  }

  async update(payload: Required<SupplierPayload>) {
    return await this._db.supplier.update({
      where: { id: payload.id },
      data: payload,
    });
  }

  async delete(id: string) {
    return await this._db.supplier.delete({
      where: { id },
    });
  }

  private async _getQuery(q: GetAllSupplierQuery) {
    const { companyId, search } = q;
    const whereClause: Prisma.SupplierWhereInput = {};
    if (search) {
      whereClause.OR = [
        {
          nama: { contains: search },
        },
      ];
    }
    whereClause.companyId = companyId;
    return this._db.supplier.paginate({
      where: whereClause,
      orderBy: { nama: "asc" },
    });
  }

  async get(q: PaginatedSupplierQuery) {
    const { limit, page } = q;
    const [data, meta] = await (
      await this._getQuery(q)
    ).withPages({ limit, page });
    return { data, meta };
  }

  async getInfinite(q: CursoredSupplierQuery) {
    const { limit, cursor } = q;
    const [data, meta] = await (
      await this._getQuery(q)
    ).withCursor({ limit, after: cursor });
    return { data, meta };
  }

  async getDetailById(query: GetDetailSupplierByIdQuery) {
    const getData = await this._db.supplier.findUnique({
      where: {
        id: query.id,
      },
      include: {
        products: true,
        purchases: {
          include: {
            ReceiveItem: {
              include: {
                purchaseInvoice: { include: { purchasePayments: true } },
              },
            },
          },
        },
      },
    });

    return getData;
  }

  async getUniqueData(query: GetUniqueSupplierQuery) {
    const getData = await this._db.supplier.findUnique({
      where: {
        nama_companyId: {
          nama: query.nama,
          companyId: query.companyId,
        },
      },
    });

    return getData;
  }

  async getTotalDebt(supplierId: string) {
    const {
      _sum: { totalAfter, totalPayment },
    } = await this._db.purchaseInvoice.aggregate({
      _sum: {
        totalAfter: true,
        totalPayment: true,
      },
      where: {
        receiveItem: { purchase: { supplierId } },
      },
    });
    return (totalAfter ?? 0) - (totalPayment ?? 0);
  }
}
