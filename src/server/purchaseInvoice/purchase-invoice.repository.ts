import { TIMEZONE } from "@/constant";
import {
  type GetPurchaseInvoiceeQuery,
  type PurchaseInvoicePayload,
  type UpdatedPurchaseInvoiceStatusPayload,
} from "@/model/purchase-invoice";
import { type Prisma } from "@prisma/client";
import { DateTime } from "luxon";

import { BaseRepository } from "@/server/common";

export class PurchaseInvoiceRepository extends BaseRepository {
  private async _generateRef(): Promise<string> {
    await this._db.$executeRawUnsafe(`
      DO $$
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_class WHERE relname = 'purchase_invoice_ref_seq') THEN
          CREATE SEQUENCE purchase_invoice_ref_seq START 1;
        END IF;
      END
      $$;
    `);

    // Get next value from the sequence
    const sequenceData = await this._db.$queryRawUnsafe<{ nextval: number }[]>(
      `SELECT nextval('purchase_invoice_ref_seq')`,
    );

    const paddedSeq = String(sequenceData[0]?.nextval ?? 1).padStart(3, "0");
    const datePart = DateTime.now().toFormat("yyyyMMdd");
    return `PI-${datePart}-${paddedSeq}`;
  }

  async create(payload: PurchaseInvoicePayload) {
    const { companyId, date, receiveItemId, ref } = payload;
    return this._db.purchaseInvoice.create({
      data: {
        companyId,
        ref: ref?.length ? ref : await this._generateRef(),
        date,
        receiveId: receiveItemId,
      },
      include: {
        receiveItem: {
          select: {
            totalAmount: true,
          },
        },
      },
    });
  }

  async findDetail(query: { id: string }) {
    const { id } = query;
    return this._db.purchaseInvoice.findFirst({
      where: { id },
      include: { receiveItem: { select: { totalAmount: true } } },
    });
  }
  async updateStatus(payload: UpdatedPurchaseInvoiceStatusPayload) {
    const { id, paymentStatus } = payload;
    return await this._db.purchaseInvoice.update({
      where: { id },
      data: { paymentStatus },
    });
  }
  async get(q: GetPurchaseInvoiceeQuery) {
    const { companyId, search, limit, page, dateRange, supplierId } = q;
    const whereClause: Prisma.PurchaseInvoiceWhereInput = {};

    whereClause.companyId = companyId;

    if (supplierId) {
      whereClause.receiveItem = {
        purchase: {
          supplierId,
        },
      };
    }

    if (dateRange) {
      const { from, to } = dateRange;
      whereClause.date = {
        gte: DateTime.fromISO(from).setZone(TIMEZONE).startOf("day").toJSDate(),
        lte: DateTime.fromISO(to).setZone(TIMEZONE).endOf("day").toJSDate(),
      };
    }

    if (search) {
      whereClause.OR = [
        {
          ref: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          id: search,
        },
      ];
    }

    const [data, meta] = await this._db.purchaseInvoice
      .paginate({
        where: whereClause,
        include: {
          receiveItem: {
            include: { purchase: { include: { supplier: true } } },
          },
        },
        orderBy: { date: "desc" },
      })
      .withPages({ limit, page });
    return { data, meta };
  }
}
