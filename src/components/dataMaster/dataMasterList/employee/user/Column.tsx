import { paths } from "@/paths/paths";
import { Flex } from "@radix-ui/themes";
import { type ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { PencilIcon } from "lucide-react";
import Link from "next/link";

import { type UserRouterOutputs } from "@/server/user/user.router";

import DeleteModal from "@/components/DeleteModal";

import DetailUserModal from "./DetailUserModal";

const columnHelper =
  createColumnHelper<UserRouterOutputs["getAll"]["data"][0]>();

export const userlColumn = (handleDeleteUser: (id: string) => void) =>
  [
    columnHelper.accessor("username", {
      header: () => <div>Nama</div>,
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("username")}</div>
      ),
    }),
    columnHelper.accessor("role", {
      header: () => <div>Role</div>,
      cell: (info) => info.getValue(),
    }),
    {
      id: "actions",
      enableHiding: false,
      header: () => <div className="text-center">Aksi</div>,
      cell: ({ row }) => (
        <Flex justify="center" gapX="3">
          <DetailUserModal
            id={row.original.id}
            name={row.original.username}
            role={row.original.role}
          />
          <Link
            href={paths.dataMaster.employee.editUser(row.original.id)}
            className="text-yellow-400"
          >
            <PencilIcon className="text-yellow-400" />
          </Link>
          <DeleteModal
            id={row.original.id}
            name={row.original.username}
            handleDelete={() => handleDeleteUser(row.original.id)}
          />
        </Flex>
      ),
    },
  ] as ColumnDef<UserRouterOutputs["getAll"]["data"][0]>[];
