import { type ColumnDef, createColumnHelper } from "@tanstack/react-table";

import { type SupplierRouterOutputs } from "@/server/supplier";

import SupplierAction from "./action";

const columnHelper =
  createColumnHelper<SupplierRouterOutputs["getAll"]["data"][0]>();

export const supplierlColumn = [
  columnHelper.accessor("nama", {
    header: () => <div>Nama</div>,
    cell: ({ row }) => <div>{row.getValue("nama")}</div>,
  }),
  columnHelper.accessor("alamat", {
    header: () => <div>Alamat</div>,
    cell: (info) => info.getValue(),
  }),
  {
    id: "actions",
    enableHiding: false,
    meta: { style: { textAlign: "right" } },
    header: () => <div className="text-center">Aksi</div>,
    cell: ({ row }) => <SupplierAction data={row.original} />,
  },
] as ColumnDef<SupplierRouterOutputs["getAll"]["data"][0]>[];
