import { paths } from "@/paths/paths";
import { formatPrice } from "@/utils/format-price";
import { Flex } from "@radix-ui/themes";
import { createColumnHelper } from "@tanstack/react-table";
import { ColumnDef } from "@tanstack/react-table";
import { EyeIcon, PencilIcon } from "lucide-react";
import Link from "next/link";

import DeleteModal from "@/components/DeleteModal";

export type PurchaseReceived = {
  noPurchaseReceived: string;
  noPurchaseOrder: string;
  date: string;
  supplier: string;
  totalItem: number;
  totalPrice: number;
};

const columnHelper = createColumnHelper<PurchaseReceived>();

export const purchaseReceivedColumn = () =>
  [
    columnHelper.accessor("noPurchaseReceived", {
      header: "No Penerimaan",
      cell: ({ row }) => <div>{row.original.noPurchaseReceived}</div>,
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
    columnHelper.accessor("totalItem", {
      id: "totalItem",
      header: "Total Barang",
      cell: ({ row }) => {
        return <div>{row.original.totalItem}</div>;
      },
    }),
    columnHelper.accessor("totalPrice", {
      id: "totalPrice",
      header: "Total Harga",
      cell: ({ row }) => {
        return <div>{row.original.totalPrice}</div>;
      },
    }),
    {
      id: "actions",
      header: () => <div className="text-center">Aksi</div>,
      cell: ({ row }) => {
        return (
          <Flex justify="center" gapX="3">
            <Link
              href={paths.purchase.purchaseReceived.detail("123")}
              className="text-yellow-400"
            >
              <EyeIcon className="cursor-pointer text-[#624DE3]" />
            </Link>
            <Link
              href={paths.purchase.purchaseReceived.edit("123")}
              className="text-yellow-400"
            >
              <PencilIcon className="text-yellow-400" />
            </Link>
            <DeleteModal
              id={row.original.noPurchaseReceived} // Atau ID yang benar
              name={row.original.noPurchaseOrder} // Properti yang benar
              handleDelete={() => {}}
            />
          </Flex>
        );
      },
    },
  ] as ColumnDef<PurchaseReceived>[];
