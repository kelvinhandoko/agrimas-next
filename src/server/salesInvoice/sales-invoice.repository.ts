import {
  type SalesInvoicePayload,
  type UpdateSalesInvoicePayload,
} from "@/model/sales-invoice.model";
import { type Prisma } from "@prisma/client";
import { DateTime } from "luxon";

import { BaseRepository, type PaginatedQuery } from "@/server/common";

export class SalesInvoiceRepository extends BaseRepository {
  private async _generateRef(): Promise<string> {
    await this._db.$executeRawUnsafe(`
        DO $$
        BEGIN
          IF NOT EXISTS (SELECT 1 FROM pg_class WHERE relname = 'sales_invoice_ref_seq') THEN
            CREATE SEQUENCE sales_invoice_ref_seq START 1;
          END IF;
        END
        $$;
      `);

    // Get next value from the sequence
    const sequenceData = await this._db.$queryRawUnsafe<{ nextval: number }[]>(
      `SELECT nextval('sales_invoice_ref_seq')`,
    );

    const paddedSeq = String(sequenceData[0]?.nextval ?? 1).padStart(3, "0");
    const datePart = DateTime.now().toFormat("yyyyMMdd");
    return `PI-${datePart}-${paddedSeq}`;
  }
  async create(payload: SalesInvoicePayload) {
    const { details, ...rest } = payload;
    const totalBefore = details.reduce(
      (acc, curr) =>
        acc + curr.price * curr.quantity + curr.tax - curr.discount,
      0,
    );

    const totalAfter = totalBefore - payload.discount + payload.tax;

    return await this._db.salesInvoice.create({
      data: {
        ...rest,
        ref: rest.ref ?? (await this._generateRef()),
        dueDate: DateTime.fromJSDate(rest.date).plus({ days: 30 }).toJSDate(),
        totalBefore,
        totalAfter,
      },
    });
  }

  async update(payload: UpdateSalesInvoicePayload) {
    const { id, date } = payload;
    return await this._db.salesInvoice.update({
      where: { id },
      data: {
        date,
        dueDate: DateTime.fromJSDate(date).plus({ days: 30 }).toJSDate(),
      },
    });
  }

  async get(q: PaginatedQuery) {
    const { companyId, search, limit, page } = q;
    const whereClause: Prisma.SalesInvoiceWhereInput = {};

    whereClause.companyId = companyId;

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
        {
          customer: {
            nama: {
              contains: search,
              mode: "insensitive",
            },
          },
        },
      ];
    }

    const [data, meta] = await this._db.salesInvoice
      .paginate({
        where: whereClause,
        orderBy: { date: "desc" },
      })
      .withPages({ limit, page });
    return { data, meta };
  }

  async delete(id: string) {
    return await this._db.salesInvoice.delete({ where: { id } });
  }
}
