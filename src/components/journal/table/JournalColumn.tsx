import { DATE_FORMAT } from "@/constant";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { DateTime } from "luxon";

import { JournalRouterOutputs } from "@/server/journal";

const columnHelper =
  createColumnHelper<JournalRouterOutputs["getAll"]["data"][0]>();

export const journalColumn = [
  columnHelper.accessor("date", {
    cell: (info) => DateTime.fromJSDate(info.getValue()).toFormat(DATE_FORMAT),
  }),
  columnHelper.accessor("ref", {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("type", {
    cell: (info) => info.getValue(),
  }),
] as ColumnDef<JournalRouterOutputs["getAll"]["data"][0]>[];
