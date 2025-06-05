import { formatPrice } from "@/utils/format-price";
import { type ColumnDef, createColumnHelper } from "@tanstack/react-table";

import { type JournalRouterOutputs } from "@/server/journal/journal.router";

const columnHelper =
  createColumnHelper<JournalRouterOutputs["getAll"]["data"][0]>();

interface JournalColumnProps {
  handleDeleteJournal: (id: string) => Promise<void>;
}

export const journalColumn = ({ handleDeleteJournal }: JournalColumnProps) =>
  [
    columnHelper.accessor("date", {
      header: "Tanggal",
      cell: ({ row }) => <div>{row.getValue("date")}</div>,
    }),
    columnHelper.accessor("description", {
      header: "Deskripsi",
      cell: ({ row }) => <div>{row.getValue("description")}</div>,
    }),
    columnHelper.accessor((row) => row.JournalDetail[0]?.debit, {
      id: "debit",
      header: "Debit",
      cell: ({ row }) => {
        const debit = row.original?.JournalDetail?.[0]?.debit;
        return debit ? <div>{formatPrice(debit)}</div> : null;
      },
    }),

    columnHelper.accessor((row) => row?.JournalDetail?.[0]?.credit, {
      id: "credit",
      header: "Kredit",
      cell: ({ row }) => {
        const credit = row.original?.JournalDetail?.[0]?.credit;
        return credit ? <div>{formatPrice(credit)}</div> : null;
      },
    }),
  ] as ColumnDef<JournalRouterOutputs["getAll"]["data"][0]>[];
