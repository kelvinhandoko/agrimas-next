import { DATE_FORMAT, NUMERIC_PROPS } from "@/constant";
import { type ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { DateTime } from "luxon";
import { useMemo } from "react";
import { NumericFormat } from "react-number-format";

import { type GeneralLedgerRouterOutputs } from "@/server/generalLedger/generalLedger.router";

export const GeneralLedgerColumn = () => {
  const columnHelper =
    createColumnHelper<GeneralLedgerRouterOutputs["get"]["data"][0]>();
  const columns = useMemo(
    () => [
      columnHelper.accessor("createdAt", {
        header: "tanggal",
        cell: (info) =>
          DateTime.fromJSDate(info.getValue()).toFormat(DATE_FORMAT),
      }),
      columnHelper.accessor("JournalDetail.journal.ref", {
        header: "ref",
        cell: (info) => info.getValue() || "-",
      }),
      columnHelper.accessor("JournalDetail.journal.description", {
        header: "deskripsi",
        cell: (info) => info.getValue() || "-",
      }),
      columnHelper.accessor("JournalDetail.debit", {
        header: "debit",
        cell: (info) => (
          <NumericFormat
            value={info.getValue()}
            {...NUMERIC_PROPS}
            displayType="text"
          />
        ),
      }),
      columnHelper.accessor("JournalDetail.credit", {
        header: "kredit",
        cell: (info) => (
          <NumericFormat
            value={info.getValue()}
            {...NUMERIC_PROPS}
            displayType="text"
          />
        ),
      }),
      columnHelper.accessor("runningBalance", {
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
  ) as ColumnDef<GeneralLedgerRouterOutputs["get"]["data"][0]>[];
  return columns;
};
