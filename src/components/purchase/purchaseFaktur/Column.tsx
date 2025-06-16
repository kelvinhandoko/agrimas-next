import { DATE_FORMAT, NUMERIC_PROPS } from "@/constant";
import { type ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { DateTime } from "luxon";
import { NumericFormat } from "react-number-format";

import { type PurchaseInvoiceRouter } from "@/server/purchaseInvoice/purchase-invoice.router";

import { Badge } from "@/components/ui/badge";

import PurchaseInvoiceRowAction from "./RowAction";

const PurchaseInvoiceColumn = () => {
  const columnHelper =
    createColumnHelper<PurchaseInvoiceRouter["get"]["data"][number]>();
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
    columnHelper.accessor("receiveItem.purchase.supplier.nama", {
      header: "Supplier",
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
    columnHelper.accessor("totalDiscount", {
      header: "total diskon",
      cell: ({ getValue }) => (
        <NumericFormat
          value={getValue()}
          {...NUMERIC_PROPS}
          displayType="text"
        />
      ),
    }),
    columnHelper.accessor("totalTax", {
      header: "total pajak",
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
    columnHelper.accessor("paymentStatus", {
      cell: ({ getValue }) => <Badge>{getValue()}</Badge>,
    }),
    columnHelper.display({
      id: "action",
      header: "action",
      cell: (info) => <PurchaseInvoiceRowAction data={info.row.original} />,
    }),
  ] as ColumnDef<PurchaseInvoiceRouter["get"]["data"][number]>[];
  return column;
};

export default PurchaseInvoiceColumn;
