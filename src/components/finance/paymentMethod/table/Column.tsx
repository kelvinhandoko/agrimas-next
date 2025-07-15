import { NUMERIC_PROPS } from "@/constant";
import { type ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { useMemo } from "react";
import { NumericFormat } from "react-number-format";

import { type PaymentMethodRouterOutputs } from "@/server/paymentMethod/payment-method.router";

export const PaymentMethodColumn = () => {
  const columnHelper =
    createColumnHelper<PaymentMethodRouterOutputs["getInfinite"]["data"][0]>();
  const columns = useMemo(
    () => [
      columnHelper.accessor("name", {
        header: "nama",
        cell: (info) =>
          `${info.getValue()} ${info.row.original.accountNumber ? `(${info.row.original.accountNumber})` : ""}`,
      }),
      columnHelper.accessor("amount", {
        header: "saldo",
        cell: (info) => (
          <NumericFormat
            value={info.getValue()}
            {...NUMERIC_PROPS}
            displayType="text"
          />
        ),
      }),
    ],
    [],
  ) as ColumnDef<PaymentMethodRouterOutputs["getInfinite"]["data"][0]>[];
  return columns;
};
