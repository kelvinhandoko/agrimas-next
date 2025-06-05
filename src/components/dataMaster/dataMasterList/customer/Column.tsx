import { paths } from "@/paths/paths";
import { Flex } from "@radix-ui/themes";
import { type ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { PencilIcon } from "lucide-react";
import Link from "next/link";

import { type CustomerRouterOutputs } from "@/server/customer";

import DeleteCustomerModal from "./deleteCustomerModal";
import DetailCustomerModal from "./detailCustomerModal";

const columnHelper =
  createColumnHelper<CustomerRouterOutputs["getAll"]["data"][0]>();

export const customerlColumn = [
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
        <DetailCustomerModal
          id={row.original.id}
          name={row.original.nama}
          alamat={row?.original?.alamat ?? ""}
        />
        <Link
          href={paths.dataMaster.customer.edit(row.original.id)}
          className="text-yellow-400"
        >
          <PencilIcon className="text-yellow-400" />
        </Link>
        <DeleteCustomerModal id={row.original.id} name={row.original.nama} />
      </Flex>
    ),
  },
] as ColumnDef<CustomerRouterOutputs["getAll"]["data"][0]>[];
