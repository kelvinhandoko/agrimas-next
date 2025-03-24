import { DATE_FORMAT, NUMERIC_PROPS } from "@/constant";
import { paths } from "@/paths/paths";
import { Flex } from "@radix-ui/themes";
import { type ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { EyeIcon, PencilIcon } from "lucide-react";
import { DateTime } from "luxon";
import Link from "next/link";
import { NumericFormat } from "react-number-format";

import { type PurchaseRouterOutputs } from "@/server/purchase/purchase.router";

import DeleteModal from "@/components/DeleteModal";

export type PurchaseOrder = {
  noPurchaseOrder: string;
  date: string;
  supplier: string;
  totalItem: number;
  totalPrice: number;
};

const columnHelper =
  createColumnHelper<PurchaseRouterOutputs["getAll"]["data"][number]>();

export const purchaseOrderColumn = () =>
  [
    columnHelper.accessor("ref", {
      header: "No Faktur",
      cell: ({ row, getValue }) => <div>{getValue()}</div>,
    }),
    columnHelper.accessor("purchaseDate", {
      id: "date",
      header: "Date",
      cell: ({ getValue }) =>
        DateTime.fromJSDate(getValue()).toFormat(DATE_FORMAT),
    }),

    columnHelper.accessor("supplier.nama", {
      id: "supplier",
      header: "Supplier",
      cell: ({ getValue }) => getValue(),
    }),
    columnHelper.accessor("netTotal", {
      id: "totalPrice",
      header: "Total Harga",
      cell: ({ getValue }) => (
        <NumericFormat
          value={getValue()}
          {...NUMERIC_PROPS}
          displayType="text"
        />
      ),
    }),
    columnHelper.accessor("purchaseDetail", {
      id: "totalItem",
      header: "Total Barang",
      cell: ({ getValue }) => {
        return (
          <p>{getValue().reduce((prev, curr) => prev + curr.quantity, 0)}</p>
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
              href={paths.purchase.purchaseOrder.detail("123")}
              className="text-yellow-400"
            >
              <EyeIcon className="cursor-pointer text-[#624DE3]" />
            </Link>
            <Link
              href={paths.purchase.purchaseOrder.edit("123")}
              className="text-yellow-400"
            >
              <PencilIcon className="text-yellow-400" />
            </Link>
            <DeleteModal
              id={row.original.id}
              name={row.original.ref}
              handleDelete={() => {}}
            />
          </Flex>
        );
      },
    },
  ] as ColumnDef<PurchaseRouterOutputs["getAll"]["data"][number]>[];
