"use client";

import { DATE_FORMAT, NUMERIC_PROPS } from "@/constant";
import { type ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { DateTime } from "luxon";
import { useMemo } from "react";
import { NumericFormat } from "react-number-format";

import { type ReceiveItemRouter } from "@/server/recieveItem/receive-item.router";

import { CardTitle } from "@/components/ui/card";

import ReceivedItemRowAction from "./RowAction";

export const PurchaseReceivedColumns = () => {
  const columnHelper =
    createColumnHelper<ReceiveItemRouter["get"]["data"][0]>();
  const col = useMemo(
    () =>
      [
        columnHelper.accessor("receiveDate", {
          id: "date",
          header: "Date",
          cell: ({ getValue }) =>
            DateTime.fromJSDate(getValue()).toFormat(DATE_FORMAT),
        }),
        columnHelper.accessor("ref", {
          header: "No Penerimaan",
          cell: ({ getValue }) => <CardTitle>{getValue()}</CardTitle>,
        }),
        columnHelper.accessor("purchase.ref", {
          header: "No Pembelian",
          cell: ({ getValue }) => <CardTitle>{getValue()}</CardTitle>,
        }),
        columnHelper.accessor("purchase.supplier.nama", {
          id: "supplier",
          header: "Supplier",
          cell: ({ getValue }) => <CardTitle>{getValue()}</CardTitle>,
        }),
        columnHelper.accessor("receiveItemDetail", {
          id: "totalItem",
          header: "Total Barang",
          cell: ({ getValue }) =>
            getValue().reduce((acc, curr) => acc + curr.quantity, 0),
        }),
        columnHelper.accessor("totalAmount", {
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
        columnHelper.display({
          id: "action",
          header: "action",
          cell: (info) => <ReceivedItemRowAction data={info.row.original} />,
        }),
      ] as ColumnDef<ReceiveItemRouter["get"]["data"][0]>[],
    [],
  );
  return col;
};
