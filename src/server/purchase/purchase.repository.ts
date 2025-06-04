import { TIMEZONE } from "@/constant";
import {
  type CursorPurchaseQuery,
  type GetAllPurchaseQuery,
  type PaginatedPurchaseQuery,
  type PurchaseDetailQuery,
  type PurchasePayload,
  type UpdatePurchaseStatusPayload,
} from "@/model/purchase.model";
import { type Prisma } from "@prisma/client";
import { DateTime } from "luxon";

import { BaseRepository } from "@/server/common";

export class PurchaseRepository extends BaseRepository {
  private async _generateRef(companyId: string): Promise<string> {
    await this._db.$executeRawUnsafe(`
        DO $$
        BEGIN
          IF NOT EXISTS (SELECT 1 FROM pg_class WHERE relname = '${companyId}_purchase_ref_seq') THEN
            CREATE SEQUENCE ${companyId}_purchase_ref_seq START 1;
          END IF;
        END
        $$;
      `);

    const sequenceData = await this._db.$queryRawUnsafe<{ nextval: number }[]>(
      `SELECT nextval('${companyId}_purchase_ref_seq')`,
    );

    const paddedSeq = String(sequenceData[0]?.nextval ?? 1).padStart(3, "0");
    const datePart = DateTime.now().toFormat("yyyyMMdd");
    return `PO-${datePart}-${paddedSeq}`;
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
      dueDate,
    } = payload;
    const totalBeforeDiscount = detail.reduce((prev, curr) => {
      const itemTotal =
        curr.price - (curr.discount ?? 0) * curr.quantity + curr.ppn;
      return prev + itemTotal;
    }, 0);

    const discountedTotal = totalBeforeDiscount - discount;
    const netTotal = discountedTotal + ppn;
    return await this._db.purchase.create({
      data: {
        purchaseDate,
        supplierId,
        discount,
        note,
        ref: ref?.length ? ref : await this._generateRef(companyId),
        totalBeforeDiscount,
        ppn,
        companyId,
        dueDate,
        status: "DIPROSES",
        netTotal,
      },
    });
  }

  async updateStatus(payload: UpdatePurchaseStatusPayload) {
    const { id, status } = payload;
    return await this._db.purchase.update({
      where: { id },
      data: { status },
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

  private async _getQuery(query: GetAllPurchaseQuery) {
    const { search, companyId, dateRange } = query;
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

    whereClause.companyId = companyId;

    if (dateRange) {
      const { from, to } = dateRange;
      whereClause.purchaseDate = {
        gte: DateTime.fromISO(from).setZone(TIMEZONE).startOf("day").toJSDate(),
        lte: DateTime.fromISO(to).setZone(TIMEZONE).endOf("day").toJSDate(),
      };
    }

    return this._db.purchase.paginate({
      where: whereClause,
      include: {
        purchaseDetail: {
          include: {
            product: true,
            receiveItemDetail: { include: { receiveItem: true } },
          },
        },
        supplier: true,
        ReceiveItem: true,
      },
    });
  }
  async get(q: PaginatedPurchaseQuery) {
    const { limit, page, ...rest } = q;
    const [data, meta] = await (
      await this._getQuery(rest)
    ).withPages({ limit, page });
    return { data, meta };
  }
  async getInfinite(q: CursorPurchaseQuery) {
    const { limit, cursor, ...rest } = q;
    const [data, meta] = await (
      await this._getQuery(rest)
    ).withCursor({ limit, after: cursor });
    return { data, meta };
  }

  async getDetail(id: string) {
    return await this._db.purchase.findUnique({
      where: { id },
      include: {
        purchaseDetail: {
          include: {
            product: true,
            receiveItemDetail: { include: { receiveItem: true } },
          },
        },
        supplier: true,
        ReceiveItem: true,
        company: true,
      },
    });
  }
}
