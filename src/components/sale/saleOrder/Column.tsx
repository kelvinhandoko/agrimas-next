import { paths } from "@/paths/paths";
import { formatPrice } from "@/utils/format-price";
import { Flex } from "@radix-ui/themes";
import { createColumnHelper } from "@tanstack/react-table";
import { ColumnDef } from "@tanstack/react-table";
import { EyeIcon, PencilIcon } from "lucide-react";
import Link from "next/link";

import DeleteModal from "@/components/DeleteModal";

export type SaleOrder = {
  noSaleOrder: string;
  date: string;
  customer: string;
  totalItem: number;
  totalPrice: number;
};

const columnHelper = createColumnHelper<SaleOrder>();

export const SaleOrderColumn = () =>
  [
    columnHelper.accessor("noSaleOrder", {
      header: "No Penjualan",
      cell: ({ row }) => <div>{row.original.noSaleOrder}</div>,
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
    columnHelper.accessor("totalPrice", {
      id: "totalPrice",
      header: "Total Harga",
      cell: ({ row }) => {
        return <div>{row.original.totalPrice}</div>;
      },
    }),
    columnHelper.accessor("totalItem", {
      id: "totalItem",
      header: "Total Barang",
      cell: ({ row }) => {
        return <div>{row.original.totalItem}</div>;
      },
    }),
    {
      id: "actions",
      header: () => <div className="text-center">Aksi</div>,
      cell: ({ row }) => {
        return (
          <Flex justify="center" gapX="3">
            <Link
              href={paths.sale.saleOrder.detail("123")}
              className="text-yellow-400"
            >
              <EyeIcon className="cursor-pointer text-[#624DE3]" />
            </Link>
            <Link
              href={paths.sale.saleOrder.edit("123")}
              className="text-yellow-400"
            >
              <PencilIcon className="text-yellow-400" />
            </Link>
            <DeleteModal
              id={row.original.noSaleOrder}
              name={row.original.noSaleOrder}
              handleDelete={() => {}}
            />
          </Flex>
        );
      },
    },
  ] as ColumnDef<SaleOrder>[];
