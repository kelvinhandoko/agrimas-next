"use client";

import { DATE_FORMAT } from "@/constant";
import { type ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { DateTime } from "luxon";

import { type PurchaseInvoiceRouter } from "@/server/purchaseInvoice/purchase-invoice.router";

const PurchaseInvoiceColumn = () => {
  const columnHelper =
    createColumnHelper<PurchaseInvoiceRouter["get"]["data"][0]>();
  const columns = [
    columnHelper.accessor("date", {
      cell: (info) =>
        DateTime.fromJSDate(info.getValue()).toFormat(DATE_FORMAT),
    }),
  ] as ColumnDef<PurchaseInvoiceRouter["get"]["data"][0]>[];
  return columns;
};

export default PurchaseInvoiceColumn;
