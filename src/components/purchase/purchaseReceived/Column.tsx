import { DATE_FORMAT, NUMERIC_PROPS } from "@/constant";
import { paths } from "@/paths/paths";
import { Flex } from "@radix-ui/themes";
import { createColumnHelper } from "@tanstack/react-table";
import { type ColumnDef } from "@tanstack/react-table";
import { EyeIcon, PencilIcon } from "lucide-react";
import { DateTime } from "luxon";
import Link from "next/link";
import { NumericFormat } from "react-number-format";

import { type ReceiveItemRouter } from "@/server/recieveItem/receive-item.router";

import { CardTitle } from "@/components/ui/card";

const columnHelper = createColumnHelper<ReceiveItemRouter["get"]["data"][0]>();

export const purchaseReceivedColumn = () =>
  [
    columnHelper.accessor("ref", {
      header: "No Penerimaan",
      cell: ({ getValue }) => <CardTitle>{getValue()}</CardTitle>,
    }),
    columnHelper.accessor("purchase.ref", {
      header: "No Pembelian",
      cell: ({ getValue }) => <CardTitle>{getValue()}</CardTitle>,
    }),
    columnHelper.accessor("receiveDate", {
      id: "date",
      header: "Date",
      cell: ({ getValue }) =>
        DateTime.fromJSDate(getValue()).toFormat(DATE_FORMAT),
    }),

    columnHelper.accessor("purchase.supplier.nama", {
      id: "supplier",
      header: "Supplier",
      cell: ({ getValue }) => <CardTitle>{getValue()}</CardTitle>,
    }),
    columnHelper.accessor("receiveItemDetail", {
      id: "totalItem",
      header: "Total Barang",
      cell: ({ getValue }) =>
        getValue().reduce((acc, curr) => acc + curr.quantity, 0),
    }),
    columnHelper.accessor("totalAmount", {
      id: "totalPrice",
      header: "Total Harga",
      cell: ({ getValue }) => (
        <NumericFormat
          value={getValue()}
          {...NUMERIC_PROPS}
          displayType="text"
        />
      ),
    }),
    {
      id: "actions",
      header: () => <div className="text-center">Aksi</div>,
      cell: ({ row }) => {
        return (
          <Flex justify="center" gapX="3">
            <Link
              href={paths.purchase.purchaseReceived.detail("123")}
              className="text-yellow-400"
            >
              <EyeIcon className="cursor-pointer text-[#624DE3]" />
            </Link>
            <Link
              href={paths.purchase.purchaseReceived.edit("123")}
              className="text-yellow-400"
            >
              <PencilIcon className="text-yellow-400" />
            </Link>
          </Flex>
        );
      },
    },
  ] as ColumnDef<ReceiveItemRouter["get"]["data"][0]>[];
