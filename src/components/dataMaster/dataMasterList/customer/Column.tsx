import { type ColumnDef, createColumnHelper } from "@tanstack/react-table";

import { type CustomerRouterOutputs } from "@/server/customer";

import CustomerAction from "./action";

const columnHelper =
  createColumnHelper<CustomerRouterOutputs["getAll"]["data"][0]>();

export const customerlColumn = [
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
    header: () => <div className="text-center">Aksi</div>,
    cell: ({ row }) => <CustomerAction data={row.original} />,
  },
] as ColumnDef<CustomerRouterOutputs["getAll"]["data"][0]>[];
