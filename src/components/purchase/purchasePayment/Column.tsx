import { paths } from "@/paths/paths";
import { formatPrice } from "@/utils/format-price";
import { Flex } from "@radix-ui/themes";
import { createColumnHelper } from "@tanstack/react-table";
import { ColumnDef } from "@tanstack/react-table";
import { EyeIcon, PencilIcon } from "lucide-react";
import Link from "next/link";

import DeleteModal from "@/components/DeleteModal";

export type PurchasePayment = {
  noPurchasePayment: string;
  noPurchaseFaktur: string;
  date: string;
  supplier: string;
  totalBill: number;
  amount: number;
  amountDue: number;
};

const columnHelper = createColumnHelper<PurchasePayment>();

export const purchasePaymentColumn = () =>
  [
    columnHelper.accessor("noPurchasePayment", {
      header: "No Pembayaran",
      cell: ({ row }) => <div>{row.original.noPurchasePayment}</div>,
    }),
    columnHelper.accessor("noPurchaseFaktur", {
      header: "No Faktur",
      cell: ({ row }) => <div>{row.original.noPurchaseFaktur}</div>,
    }),
    columnHelper.accessor("date", {
      id: "date",
      header: "Date",
      cell: ({ row }) => {
        return <div>{row.original.date}</div>;
      },
    }),

    columnHelper.accessor("supplier", {
      id: "supplier",
      header: "Supplier",
      cell: ({ row }) => {
        return <div>{row.original.supplier}</div>;
      },
    }),
    columnHelper.accessor("totalBill", {
      id: "totalBill",
      header: "Total Tagihan",
      cell: ({ row }) => {
        return <div>{row.original.totalBill}</div>;
      },
    }),
    columnHelper.accessor("amount", {
      id: "amount",
      header: "Jumlah Pembayaran",
      cell: ({ row }) => {
        return <div>{row.original.amount}</div>;
      },
    }),
    columnHelper.accessor("amountDue", {
      id: "amountDue",
      header: "Sisa Tagihan",
      cell: ({ row }) => {
        return <div>{row.original.amountDue}</div>;
      },
    }),
    {
      id: "actions",
      header: () => <div className="text-center">Aksi</div>,
      cell: ({ row }) => {
        return (
          <Flex justify="center" gapX="3">
            <Link
              href={paths.purchase.purchasePayment.detail("123")}
              className="text-yellow-400"
            >
              <EyeIcon className="cursor-pointer text-[#624DE3]" />
            </Link>
            <Link
              href={paths.purchase.purchasePayment.edit("123")}
              className="text-yellow-400"
            >
              <PencilIcon className="text-yellow-400" />
            </Link>
            <DeleteModal
              id={row.original.noPurchasePayment}
              name={row.original.noPurchasePayment}
              handleDelete={() => {}}
            />
          </Flex>
        );
      },
    },
  ] as ColumnDef<PurchasePayment>[];
