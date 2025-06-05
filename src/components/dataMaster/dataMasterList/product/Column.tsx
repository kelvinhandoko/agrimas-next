import { paths } from "@/paths/paths";
import { formatPrice } from "@/utils/format-price";
import { Flex } from "@radix-ui/themes";
import { type ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { PencilIcon } from "lucide-react";
import Link from "next/link";

import { type ProductRouterOutput } from "@/server/product/product.router";

import DeleteModal from "@/components/DeleteModal";

import DetailProductModal from "./detailProductModal";

const columnHelper =
  createColumnHelper<ProductRouterOutput["getAll"]["data"][0]>();

interface ProductColumnProps {
  handleDeleteProduct: (id: string) => Promise<void>;
}

export const productColumn = ({ handleDeleteProduct }: ProductColumnProps) =>
  [
    columnHelper.accessor("name", {
      header: () => <div>Nama Produk</div>,
      cell: ({ row }) => <div className="lowercase">{row.original.name}</div>,
    }),
    columnHelper.accessor("sellingPrice", {
      header: () => <div>Harga jual</div>,
      cell: ({ getValue }) => <div>{formatPrice(getValue())}</div>,
    }),
    columnHelper.accessor("averagePrice", {
      header: () => <div>Harga rata-rata</div>,
      cell: ({ row }) => <div>{formatPrice(row.original.averagePrice)}</div>,
    }),
    columnHelper.accessor("currentQuantity", {
      header: () => <div>Qty</div>,
      cell: ({ row }) => (
        <div className="lowercase">{row.original.currentQuantity}</div>
      ),
    }),
    {
      id: "actions",
      enableHiding: false,
      header: () => <div className="text-center">Aksi</div>,
      cell: ({ row }) => (
        <Flex justify="center" gapX="3">
          <DetailProductModal
            id={row.original.id}
            name={row.original.name}
            price={row.original.averagePrice}
            supplierId={row.original.supplierId}
          />
          <Link
            href={paths.dataMaster.product.edit(row.original.id)}
            className="text-yellow-400"
          >
            <PencilIcon className="text-yellow-400" />
          </Link>
          <DeleteModal
            id={row.original.id}
            name={row.original.name}
            handleDelete={() => handleDeleteProduct(row.original.id)}
          />
        </Flex>
      ),
    },
  ] as ColumnDef<ProductRouterOutput["getAll"]["data"][0]>[];
