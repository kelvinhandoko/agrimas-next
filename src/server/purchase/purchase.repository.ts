import {
  type GetAllPurchaseQuery,
  type PurchaseDetailQuery,
  type PurchasePayload,
  type UpdatePurchaseStatusPayload,
} from "@/model/purchase.model";
import { discountHandler } from "@/utils/discountHandler";
import { type Prisma } from "@prisma/client";
import { nanoid } from "nanoid";

import { BaseRepository } from "@/server/common";

export class PurchaseRepository extends BaseRepository {
  async _createUniqueRef() {
    return nanoid(10);
  }

  async findUniqueRef(ref: string) {
    return await this._db.purchase.findFirst({
      where: {
        ref,
        deleted: { not: null },
      },
    });
  }

  async create(payload: PurchasePayload) {
    const {
      detail,
      purchaseDate,
      supplierId,
      discount,
      note,
      ref,
      companyId,
      ppn,
    } = payload;
    const totalBeforeDiscount = detail.reduce((prev, curr) => {
      const itemTotal =
        discountHandler(curr.price, curr.discount ?? 0) * curr.quantity;
      return prev + itemTotal;
    }, 0);

    const discountedTotal = discountHandler(totalBeforeDiscount, discount);
    const ppnPercent = (ppn ?? 0) / 100;
    const totalTax = discountedTotal * ppnPercent;
    const netTotal = discountedTotal + totalTax;
    return await this._db.purchase.create({
      data: {
        purchaseDate,
        supplierId,
        discount,
        note,
        ref: ref?.length ? ref : await this._createUniqueRef(),
        totalBeforeDiscount,
        ppn: totalTax,
        companyId,
        status: "DIPROSES",
        paymentStatus: "UNPAID",
        netTotal,
      },
    });
  }

  async updateStatus(payload: UpdatePurchaseStatusPayload) {
    const { id, paymentStatus, status } = payload;
    return await this._db.purchase.update({
      where: { id },
      data: { status, paymentStatus },
    });
  }

  async findDetail<T extends Prisma.PurchaseInclude>(
    query: PurchaseDetailQuery<T>,
  ) {
    const { id, include } = query;
    return await this._db.purchase.findUnique({
      where: { id },
      include: include ?? (undefined as unknown as T),
    });
  }

  async findMany<T extends Prisma.PurchaseInclude>(
    query: GetAllPurchaseQuery<T>,
  ) {
    const { include, limit, page, search } = query;
    const whereClause: Prisma.PurchaseWhereInput = {};
    if (search) {
      whereClause.OR = [
        {
          ref: {
            contains: search,
          },
          id: {
            contains: search,
          },
        },
      ];
    }

    const [data, meta] = await this._db.purchase
      .paginate({
        where: whereClause,
        include: include ?? (undefined as unknown as T),
      })
      .withPages({
        limit,
        page,
        includePageCount: true,
      });
    return { data, meta };
  }
}
