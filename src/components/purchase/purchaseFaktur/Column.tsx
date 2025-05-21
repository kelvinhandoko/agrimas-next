import { paths } from "@/paths/paths";
import { Flex } from "@radix-ui/themes";
import { type ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { EyeIcon, PencilIcon } from "lucide-react";
import Link from "next/link";

import DeleteModal from "@/components/DeleteModal";
import { Badge } from "@/components/ui/badge";

type PurchaseFaktur = {
  noPurchaseFaktur: string;
  noPurchaseOrder: string;
  date: string;
  supplier: string;
  status: string;
};

const columnHelper = createColumnHelper<PurchaseFaktur>();

export const purchaseFakturColumn = () =>
  [
    columnHelper.accessor("noPurchaseFaktur", {
      header: "No Faktur",
      cell: ({ row }) => <div>{row.original.noPurchaseFaktur}</div>,
    }),
    columnHelper.accessor("noPurchaseOrder", {
      header: "No Pembelian",
      cell: ({ row }) => <div>{row.original.noPurchaseOrder}</div>,
    }),
    columnHelper.accessor("date", {
      id: "date",
      header: "Date",
      cell: ({ row }) => {
        return <div>{row.original.date}</div>;
      },
    }),

    columnHelper.accessor("supplier", {
      id: "supplier",
      header: "Supplier",
      cell: ({ row }) => {
        return <div>{row.original.supplier}</div>;
      },
    }),
    columnHelper.accessor("status", {
      id: "status",
      header: "Status",
      cell: ({ row }) => {
        return (
          <div>
            <Badge
              variant={row.original.status === "paid" ? "success" : "error"}
            >
              {row.original.status === "paid" ? "Lunas" : "Belum Lunas"}
            </Badge>
          </div>
        );
      },
    }),
    {
      id: "actions",
      header: () => <div className="text-center">Aksi</div>,
      cell: ({ row }) => {
        return (
          <Flex justify="center" gapX="3">
            <Link
              href={paths.purchase.purchaseFaktur.detail("123")}
              className="text-yellow-400"
            >
              <EyeIcon className="cursor-pointer text-[#624DE3]" />
            </Link>
            <Link
              href={paths.purchase.purchaseFaktur.edit("123")}
              className="text-yellow-400"
            >
              <PencilIcon className="text-yellow-400" />
            </Link>
            <DeleteModal
              id={row.original.noPurchaseFaktur}
              name={row.original.noPurchaseFaktur}
            />
          </Flex>
        );
      },
    },
  ] as ColumnDef<PurchaseFaktur>[];
