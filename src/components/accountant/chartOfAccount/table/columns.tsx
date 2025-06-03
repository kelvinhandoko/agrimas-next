"use client";

import { type ColumnDef, createColumnHelper } from "@tanstack/react-table";

import { type AccountRouterOutputs } from "@/server/account";

const ChartOfAccountColumn = () => {
  const columnHelper =
    createColumnHelper<AccountRouterOutputs["get"]["data"][number]>();
  const columns = [
    columnHelper.accessor("code", {
      header: "Kode",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("name", {
      header: "Nama",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("groupAccount.name", {
      header: "Kelompok Akun",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("posisi", {
      header: "Posisi",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("reports", {
      header: "Laporan",
      cell: (info) => info.getValue().join(", "),
    }),
  ] as ColumnDef<AccountRouterOutputs["get"]["data"][number]>[];
  return columns;
};

export default ChartOfAccountColumn;
