import { paths } from "@/paths/paths";
import { type SupplierRouterOutputs } from "@/server";
import { Flex } from "@radix-ui/themes";
import { type ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { Eye, PencilIcon } from "lucide-react";
import Link from "next/link";

import DeleteSupplierModal from "./deleteSupplierModal";
import DetailSupplierModal from "./detailSupplierModal";

const columnHelper =
  createColumnHelper<SupplierRouterOutputs["getAll"]["data"][0]>();

export const supplierlColumn = [
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
        <DetailSupplierModal
          id={row.original.id}
          name={row.original.nama}
          alamat={row.original.alamat || ""}
        />
        <Link
          href={paths.dataMaster.supplier.edit(row.original.id)}
          className="text-yellow-400"
        >
          <PencilIcon className="text-yellow-400" />
        </Link>
        <DeleteSupplierModal id={row.original.id} name={row.original.nama} />
      </Flex>
    ),
  },
] as ColumnDef<SupplierRouterOutputs["getAll"]["data"][0]>[];
