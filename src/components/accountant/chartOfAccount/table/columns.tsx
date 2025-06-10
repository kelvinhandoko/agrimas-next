"use client";

import { splitText } from "@/utils/formatter/stringFormatter";
import { type ColumnDef, createColumnHelper } from "@tanstack/react-table";

import { type AccountRouterOutputs } from "@/server/account";

import ChartOfAccountRowAction from "@/components/accountant/chartOfAccount/table/RowAction";
import { Badge } from "@/components/ui/badge";

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
      cell: (info) => (
        <div className="flex flex-wrap items-end justify-end gap-2">
          {info.getValue().map((report, index) => (
            <Badge key={index}>{splitText(report)}</Badge>
          ))}
        </div>
      ),
    }),
    columnHelper.display({
      id: "actions",
      header: "Aksi",
      cell: (info) => <ChartOfAccountRowAction data={info.row.original} />,
    }),
  ] as ColumnDef<AccountRouterOutputs["get"]["data"][number]>[];
  return columns;
};

export default ChartOfAccountColumn;
