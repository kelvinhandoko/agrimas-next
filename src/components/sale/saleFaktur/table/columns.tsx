import { DATE_FORMAT, NUMERIC_PROPS } from "@/constant";
import { type ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { DateTime } from "luxon";
import { NumericFormat } from "react-number-format";

import { type SalesInvoiceRouterOutput } from "@/server/salesInvoice/sales-invoice.router";

import SalesInvoiceRowAction from "@/components/sale/saleFaktur/table/RowAction";
import { Badge } from "@/components/ui/badge";

const SalesInvoiceColumn = () => {
  const columnHelper =
    createColumnHelper<SalesInvoiceRouterOutput["get"]["data"][number]>();
  const column = [
    columnHelper.accessor("date", {
      header: "tanggal",
      cell: ({ getValue }) =>
        DateTime.fromJSDate(getValue()).toFormat(DATE_FORMAT),
    }),
    columnHelper.accessor("ref", {
      header: "No Faktur",
      cell: ({ getValue }) => getValue(),
    }),
    columnHelper.accessor("totalBefore", {
      header: "total (sblm diskon)",
      cell: ({ getValue }) => (
        <NumericFormat
          value={getValue()}
          {...NUMERIC_PROPS}
          displayType="text"
        />
      ),
    }),
    columnHelper.accessor("discount", {
      header: "diskon",
      cell: ({ getValue }) => (
        <NumericFormat
          value={getValue()}
          {...NUMERIC_PROPS}
          displayType="text"
        />
      ),
    }),
    columnHelper.accessor("tax", {
      header: "pajak",
      cell: ({ getValue }) => (
        <NumericFormat
          value={getValue()}
          {...NUMERIC_PROPS}
          displayType="text"
        />
      ),
    }),
    columnHelper.accessor("totalAfter", {
      header: "total akhir",
      cell: ({ getValue }) => (
        <NumericFormat
          value={getValue()}
          {...NUMERIC_PROPS}
          displayType="text"
        />
      ),
    }),
    columnHelper.accessor("cogs", {
      header: "profit",
      cell: ({ getValue, row }) => (
        <Badge
          variant={
            row.original.totalBefore - row.original.discount - getValue() < 0
              ? "error"
              : "success"
          }
        >
          <NumericFormat
            value={Math.abs(
              row.original.totalBefore - row.original.discount - getValue(),
            )}
            {...NUMERIC_PROPS}
            displayType="text"
          />
        </Badge>
      ),
    }),
    columnHelper.accessor("status", {
      cell: ({ getValue }) => <Badge>{getValue()}</Badge>,
    }),
    columnHelper.display({
      id: "action",
      header: "action",
      cell: (info) => <SalesInvoiceRowAction data={info.row.original} />,
    }),
  ] as ColumnDef<SalesInvoiceRouterOutput["get"]["data"][number]>[];
  return column;
};

export default SalesInvoiceColumn;
