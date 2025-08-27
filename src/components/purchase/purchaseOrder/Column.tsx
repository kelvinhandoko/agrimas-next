import { DATE_FORMAT, NUMERIC_PROPS } from "@/constant";
import { type ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { DateTime } from "luxon";
import { NumericFormat } from "react-number-format";

import { type PurchaseRouterOutputs } from "@/server/purchase/purchase.router";

import PurchaseOrderAction from "./action";

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
      header: "No Pembelian",
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
        return <PurchaseOrderAction data={row.original} />;
      },
    },
  ] as ColumnDef<PurchaseRouterOutputs["getAll"]["data"][number]>[];
