import { paths } from "@/paths/paths";
import { formatPrice } from "@/utils/format-price";
import { Flex } from "@radix-ui/themes";
import { createColumnHelper } from "@tanstack/react-table";
import { type ColumnDef } from "@tanstack/react-table";
import { EyeIcon, PencilIcon } from "lucide-react";
import Link from "next/link";

import DeleteModal from "@/components/DeleteModal";
import { Badge } from "@/components/ui/badge";

type PurchasePayable = {
  noPurchaseFaktur: string;
  dueDate: string;
  supplier: string;
  totalBill: number;
  totalAmount: number;
  dueAmount: number;
  status: string;
};

const columnHelper = createColumnHelper<PurchasePayable>();

export const purchasePayableColumn = () =>
  [
    columnHelper.accessor("noPurchaseFaktur", {
      header: "No Faktur",
      cell: ({ row }) => <div>{row.original.noPurchaseFaktur}</div>,
    }),
    columnHelper.accessor("supplier", {
      header: "Supplier",
      cell: ({ row }) => <div>{row.original.supplier}</div>,
    }),
    columnHelper.accessor("dueDate", {
      id: "dueDate",
      header: "dueDate",
      cell: ({ row }) => {
        return <div>{row.original.dueDate}</div>;
      },
    }),

    columnHelper.accessor("totalBill", {
      id: "totalBill",
      header: "Total Tagihan",
      cell: ({ row }) => {
        return <div>{formatPrice(row.original.totalBill)}</div>;
      },
    }),
    columnHelper.accessor("totalAmount", {
      id: "totalAmount",
      header: "Jumlah Dibayar",
      cell: ({ row }) => {
        return <div>{formatPrice(row.original.totalAmount)}</div>;
      },
    }),
    columnHelper.accessor("dueAmount", {
      id: "dueAmount",
      header: "Sisa Tagihan",
      cell: ({ row }) => {
        return <div>{formatPrice(row.original.dueAmount)}</div>;
      },
    }),
    columnHelper.accessor("status", {
      id: "status",
      header: "Status",
      cell: ({ row }) => {
        return (
          <div>
            <Badge
              className={`px-6 py-1 ${
                row.original.status === "paid"
                  ? "bg-[#EBF9F1] text-[#1F9254] hover:bg-[#EBF9F1]"
                  : "bg-[#FBE7E8] text-[#A30D11] hover:bg-[#FBE7E8]"
              }`}
            >
              {row.original.status === "paid" ? "Lunas" : "Belum Lunas"}
            </Badge>
          </div>
        );
      },
    }),
    {
      id: "actions",
      header: () => <div className="text-center">Aksi</div>,
      cell: ({ row }) => {
        return (
          <Flex justify="center" gapX="3">
            <Link
              href={paths.purchase.purchasePayable.detail("123")}
              className="text-yellow-400"
            >
              <EyeIcon className="cursor-pointer text-[#624DE3]" />
            </Link>
            <Link
              href={paths.purchase.purchasePayable.edit("123")}
              className="text-yellow-400"
            >
              <PencilIcon className="text-yellow-400" />
            </Link>
            <DeleteModal
              id={row.original.noPurchaseFaktur}
              name={row.original.noPurchaseFaktur}
            />
          </Flex>
        );
      },
    },
  ] as ColumnDef<PurchasePayable>[];
