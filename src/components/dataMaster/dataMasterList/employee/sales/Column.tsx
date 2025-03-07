import { paths } from "@/paths/paths";
import { Flex } from "@radix-ui/themes";
import { type ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { PencilIcon } from "lucide-react";
import Link from "next/link";

import { type SalesRouterOutputs } from "@/server/sales/sales.router";

import DeleteModal from "@/components/DeleteModal";

import DetailSalesModal from "./DetailSalesModal";

// import DetailUserModal from "./DetailUserModal";

const columnHelper = createColumnHelper<SalesRouterOutputs["findAll"][0][0]>();

interface SalesColumnProps {
  handleDeleteSales: (id: string) => Promise<void>;
}

export const salesColumn = ({ handleDeleteSales }: SalesColumnProps) =>
  [
    columnHelper.accessor("name", {
      header: () => <div>Nama</div>,
      cell: ({ row }) => <div className="lowercase">{row.original.name}</div>,
    }),
    {
      id: "actions",
      enableHiding: false,
      header: () => <div className="text-center">Aksi</div>,
      cell: ({ row }) => {
        return (
          <Flex justify="center" gapX="3">
            <DetailSalesModal name={row.original.name} />
            <Link
              href={paths.dataMaster.employee.editSales(row.original.id)}
              className="text-yellow-400"
            >
              <PencilIcon className="text-yellow-400" />
            </Link>
            <DeleteModal
              id={row.id}
              name={""}
              handleDelete={() => handleDeleteSales(row.original.id)}
            />
          </Flex>
        );
      },
    },
  ] as ColumnDef<SalesRouterOutputs["findAll"][0][0]>[];
