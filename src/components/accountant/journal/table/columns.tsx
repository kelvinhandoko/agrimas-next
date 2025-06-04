"use client";

import { DATE_FORMAT, NUMERIC_PROPS } from "@/constant";
import { type ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { DateTime } from "luxon";
import { NumericFormat } from "react-number-format";

import { type JournalRouterOutputs } from "@/server/journal/journal.router";

const JournalColumn = () => {
  const columnHelper =
    createColumnHelper<JournalRouterOutputs["get"]["data"][number]>();
  const columns = [
    columnHelper.accessor("date", {
      header: "tanggal",
      cell: (info) =>
        DateTime.fromJSDate(info.getValue()).toFormat(DATE_FORMAT),
    }),
    columnHelper.accessor("ref", {
      cell: (info) => info.getValue() || "-",
    }),
    columnHelper.accessor("description", {
      header: "deskripsi",
      cell: (info) => info.getValue(),
    }),
    columnHelper.display({
      header: "debet",
      id: "debet",
      cell: ({ row }) => (
        <NumericFormat
          value={row.original.JournalDetail.reduce(
            (acc, curr) => acc + curr.debit,
            0,
          )}
          {...NUMERIC_PROPS}
        />
      ),
    }),
    columnHelper.display({
      header: "kredit",
      id: "kredit",
      cell: ({ row }) => (
        <NumericFormat
          value={row.original.JournalDetail.reduce(
            (acc, curr) => acc + curr.credit,
            0,
          )}
          {...NUMERIC_PROPS}
        />
      ),
    }),
  ] as ColumnDef<JournalRouterOutputs["get"]["data"][number]>[];
  return columns;
};

export default JournalColumn;
