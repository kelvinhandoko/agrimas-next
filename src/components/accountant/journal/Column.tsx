import { paths } from "@/paths/paths";
import { formatPrice } from "@/utils/format-price";
import { Flex } from "@radix-ui/themes";
import { type ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { EyeIcon, PencilIcon } from "lucide-react";
import Link from "next/link";

import { type JournalRouterOutputs } from "@/server/journal/journal.router";

import DeleteModal from "@/components/DeleteModal";

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
    {
      id: "actions",
      header: () => <div className="text-center">Aksi</div>,
      cell: ({ row }) => {
        const journalId =
          row.original?.[0]?.JournalDetail?.[0]?.journalId ?? "";
        return (
          <Flex justify="center" gapX="3">
            <Link
              href={paths.accountant.editJournal(journalId)}
              className="text-yellow-400"
            >
              <EyeIcon className="cursor-pointer text-[#624DE3]" />
            </Link>
            <Link
              href={paths.accountant.editJournal(journalId)}
              className="text-yellow-400"
            >
              <PencilIcon className="text-yellow-400" />
            </Link>
            <DeleteModal
              id={journalId} // ID utama jurnal diambil dari JournalDetail
              name={row.original?.[0]?.description ?? ""}
              handleDelete={() => handleDeleteJournal(journalId)}
            />
          </Flex>
        );
      },
    },
  ] as ColumnDef<JournalRouterOutputs["getAll"]["data"]>[];
