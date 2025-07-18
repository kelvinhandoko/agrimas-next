import { DATE_FORMAT } from "@/constant";
import { type ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { DateTime } from "luxon";
import { useMemo } from "react";

import { type InvoiceReturnRouterOutputs } from "@/server/invoiceReturn/invoice-return.router";

export const SalesReturnColumns = () => {
  const columnHelper =
    createColumnHelper<InvoiceReturnRouterOutputs["get"]["data"][number]>();
  const columns = useMemo(
    () => [
      columnHelper.accessor("ref", {
        header: "no pengembalian",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("date", {
        header: "tanggal",
        cell: (info) =>
          DateTime.fromJSDate(info.getValue()).toFormat(DATE_FORMAT),
      }),
      columnHelper.accessor("customer.nama", {
        header: "customer",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("InvoiceReturnDetail", {
        header: "total barang di retur",
        cell: (info) =>
          info.getValue().reduce((acc, curr) => acc + curr.quantity, 0),
      }),
    ],
    [],
  ) as ColumnDef<InvoiceReturnRouterOutputs["get"]["data"][number]>[];
  return columns;
};
