import { paths } from "@/paths/paths";
import { formatPrice } from "@/utils/format-price";
import { type ColumnDef, createColumnHelper } from "@tanstack/react-table";

import { type ProductRouterOutput } from "@/server/product/product.router";

import ProductAction from "./action";

const columnHelper =
  createColumnHelper<ProductRouterOutput["getAll"]["data"][0]>();

interface ProductColumnProps {
  handleDeleteProduct: (id: string) => Promise<void>;
  handleEditProduct: (id: string) => Promise<void>;
}
export const productColumn = ({
  handleDeleteProduct,
  handleEditProduct,
}: ProductColumnProps) =>
  [
    columnHelper.accessor("name", {
      header: () => <div>Nama Produk</div>,
      cell: ({ row }) => <div className="capitalize">{row.original.name}</div>,
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
        <ProductAction
          data={row.original}
          onEdit={(id: string) => handleEditProduct(id)}
        />
      ),
    },
  ] as ColumnDef<ProductRouterOutput["getAll"]["data"][0]>[];
