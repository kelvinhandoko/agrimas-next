import { DATE_FORMAT, NUMERIC_PROPS } from "@/constant";
import { type ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { DateTime } from "luxon";
import { NumericFormat } from "react-number-format";

import { type SalesPaymentRouterOutput } from "@/server/salesPayment/sales-payment.router";

export const salesInvoicePaymentColumn = () => {
  const columnHelper =
    createColumnHelper<SalesPaymentRouterOutput["get"]["data"][number]>();
  return [
    columnHelper.accessor("date", {
      header: "tanggal",
      cell: (info) =>
        DateTime.fromJSDate(info.getValue()).toFormat(DATE_FORMAT),
    }),
    columnHelper.accessor("amount", {
      header: "jumlah",
      cell: (info) => (
        <NumericFormat
          value={info.getValue()}
          {...NUMERIC_PROPS}
          displayType="text"
        />
      ),
    }),
    columnHelper.accessor("paymentMethod.name", {
      header: "metode pembayaran",
      cell: (info) => info.getValue(),
    }),
  ] as ColumnDef<SalesPaymentRouterOutput["get"]["data"][number]>[];
};
