import { DATE_FORMAT } from "@/constant";
import { type ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { DateTime } from "luxon";
import { useMemo } from "react";

import { type PurchaseReturnRouterOutputs } from "@/server/purchaseReturn/purchase-return.router";

export const PurchaseReturnColumns = () => {
  const columnHelper =
    createColumnHelper<PurchaseReturnRouterOutputs["get"]["data"][number]>();
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
      columnHelper.accessor("supplier.nama", {
        header: "supplier",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("PurchaseReturnDetail", {
        header: "total barang di retur",
        cell: (info) =>
          info.getValue().reduce((acc, curr) => acc + curr.quantity, 0),
      }),
    ],
    [],
  ) as ColumnDef<PurchaseReturnRouterOutputs["get"]["data"][number]>[];
  return columns;
};
