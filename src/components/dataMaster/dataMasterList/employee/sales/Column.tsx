import { type ColumnDef, createColumnHelper } from "@tanstack/react-table";

import { type SalesPersonRouterOutputs } from "@/server/salesPerson/sales-person.router";

import SalesAction from "./action";

const columnHelper =
  createColumnHelper<SalesPersonRouterOutputs["findAll"]["data"][0]>();

interface SalesColumnProps {
  handleDeleteSales: (id: string) => Promise<void>;
}

export const salesColumn = ({ handleDeleteSales }: SalesColumnProps) =>
  [
    columnHelper.accessor("name", {
      header: () => <div>Nama</div>,
      cell: ({ row }) => <div className="capitalize">{row.original.name}</div>,
    }),
    {
      id: "actions",
      enableHiding: false,
      header: () => <div className="text-center">Aksi</div>,
      cell: ({ row }) => {
        return <SalesAction data={row.original} />;
      },
    },
  ] as ColumnDef<SalesPersonRouterOutputs["findAll"]["data"][0]>[];
