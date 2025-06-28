import { DATE_FORMAT, NUMERIC_PROPS } from "@/constant";
import { type ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { DateTime } from "luxon";
import { useMemo } from "react";
import { NumericFormat } from "react-number-format";

import { type JournalRouterOutputs } from "@/server/journal/journal.router";

export const JournalColumn = () => {
  const columnHelper =
    createColumnHelper<JournalRouterOutputs["get"]["data"][0]>();
  const column = useMemo(
    () => [
      columnHelper.accessor("date", {
        header: "Tanggal",
        cell: ({ getValue }) =>
          DateTime.fromJSDate(getValue()).toFormat(DATE_FORMAT),
      }),
      columnHelper.accessor("description", {
        header: "Deskripsi",
        cell: ({ getValue }) => <div>{getValue() || "-"}</div>,
      }),
      columnHelper.accessor("ref", {
        header: "ref",
        cell: ({ getValue }) => <div>{getValue() || "-"}</div>,
      }),
      columnHelper.display({
        id: "total",
        header: "Total",
        cell: ({ row }) => (
          <NumericFormat
            value={row.original.JournalDetail.reduce(
              (acc, curr) => acc + curr.debit,
              0,
            )}
            {...NUMERIC_PROPS}
            displayType="text"
          />
        ),
      }),
    ],
    [],
  ) as ColumnDef<JournalRouterOutputs["get"]["data"][0]>[];
  return column;
};
