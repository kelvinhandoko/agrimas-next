import { paths } from "@/paths/paths";
import { type SupplierRouterOutputs } from "@/server";
import { Flex } from "@radix-ui/themes";
import { type ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { Eye, PencilIcon } from "lucide-react";
import Link from "next/link";

import DeleteSupplierModal from "./deleteSupplierModal";

const columnHelper =
  createColumnHelper<SupplierRouterOutputs["getAll"]["data"][0]>();

export const journalColumn = [
  columnHelper.accessor("nama", {
    header: () => <div>Nama</div>,
    cell: ({ row }) => <div className="lowercase">{row.getValue("nama")}</div>,
  }),
  columnHelper.accessor("alamat", {
    header: () => <div>Alamat</div>,
    cell: (info) => info.getValue(),
  }),
  {
    id: "actions",
    enableHiding: false,
    header: () => <div className="text-center">Aksi</div>,
    cell: ({ row }) => (
      <Flex justify="center" gapX="3">
        <Link href="#">
          <Eye className="text-primary" />
        </Link>
        <Link href={paths.dataMaster.supplier.edit(row.original.id)}>
          <PencilIcon className="text-warning" />
        </Link>
        <DeleteSupplierModal />
      </Flex>
    ),
  },
] as ColumnDef<SupplierRouterOutputs["getAll"]["data"][0]>[];
