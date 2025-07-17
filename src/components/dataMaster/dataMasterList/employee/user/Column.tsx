import { type ColumnDef, createColumnHelper } from "@tanstack/react-table";

import { type UserRouterOutputs } from "@/server/user/user.router";

import UserAction from "./action";

const columnHelper =
  createColumnHelper<UserRouterOutputs["getAll"]["data"][0]>();

interface UserColumnProps {
  handleDeleteUser: (id: string) => Promise<void>;
}

export const userColumn = ({ handleDeleteUser }: UserColumnProps) =>
  [
    columnHelper.accessor("username", {
      header: () => <div>Nama</div>,
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("username")}</div>
      ),
    }),
    columnHelper.accessor("role", {
      header: "role",
      id: "role",
      cell: (info) => info.getValue(),
    }),
    {
      id: "actions",
      enableHiding: false,
      header: () => <div className="text-center">Aksi</div>,
      cell: ({ row }) => <UserAction data={row.original} />,
    },
  ] as ColumnDef<UserRouterOutputs["getAll"]["data"][0]>[];
