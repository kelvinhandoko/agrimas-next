import { paths } from "@/paths/paths";
import { formatPrice } from "@/utils/format-price";
import { Flex } from "@radix-ui/themes";
import { createColumnHelper } from "@tanstack/react-table";
import { ColumnDef } from "@tanstack/react-table";
import { EyeIcon, PencilIcon } from "lucide-react";
import Link from "next/link";

import DeleteModal from "@/components/DeleteModal";

export type SaleShipping = {
  noSaleShipping: string;
  noPurchaseOrder: string;
  date: string;
  customer: string;
  totalItem: number;
  totalPrice: number;
};

const columnHelper = createColumnHelper<SaleShipping>();

export const SaleShippingColumn = () =>
  [
    columnHelper.accessor("noSaleShipping", {
      header: "No Pengiriman",
      cell: ({ row }) => <div>{row.original.noSaleShipping}</div>,
    }),
    columnHelper.accessor("noPurchaseOrder", {
      header: "No Penjualan",
      cell: ({ row }) => <div>{row.original.noPurchaseOrder}</div>,
    }),
    columnHelper.accessor("date", {
      id: "date",
      header: "Date",
      cell: ({ row }) => {
        return <div>{row.original.date}</div>;
      },
    }),

    columnHelper.accessor("customer", {
      id: "customer",
      header: "Customer",
      cell: ({ row }) => {
        return <div>{row.original.customer}</div>;
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
              href={paths.sale.saleShipping.detail("123")}
              className="text-yellow-400"
            >
              <EyeIcon className="cursor-pointer text-[#624DE3]" />
            </Link>
            <Link
              href={paths.sale.saleShipping.edit("123")}
              className="text-yellow-400"
            >
              <PencilIcon className="text-yellow-400" />
            </Link>
            <DeleteModal
              id={row.original.noSaleShipping} // Atau ID yang benar
              name={row.original.noSaleShipping} // Properti yang benar
              handleDelete={() => {}}
            />
          </Flex>
        );
      },
    },
  ] as ColumnDef<SaleShipping>[];
