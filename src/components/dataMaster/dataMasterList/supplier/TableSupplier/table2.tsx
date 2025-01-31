"use client";

import { paths } from "@/paths/paths";
import { SupplierRouterOutputs } from "@/server";
import { api } from "@/trpc/react";
import { Flex } from "@radix-ui/themes";
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, Eye, PencilIcon, PlusIcon } from "lucide-react";
import Link from "next/link";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import DeleteSupplierModal from "./deleteSupplierModal";

const columnHelper =
  createColumnHelper<SupplierRouterOutputs["getAll"]["data"][0]>();

export const journalColumn = [
  columnHelper.accessor("nama", {
    header: () => <div>Nama</div>,
    cell: ({ row }) => <div className="lowercase">{row.getValue("nama")}</div>,
  }),
  columnHelper.accessor("alamat", {
    header: () => <div>Alamat</div>,
    cell: (info) => info.getValue(),
  }),
  {
    id: "actions",
    enableHiding: false,
    header: () => <div className="text-center">Aksi</div>,
    cell: ({ row }) => (
      <Flex justify="center" gapX="3">
        <Link href="#">
          <Eye className="text-primary" />
        </Link>
        <Link href={paths.dataMaster.supplier.edit(row.original.id)}>
          <PencilIcon className="text-warning" />
        </Link>
        <DeleteSupplierModal />
      </Flex>
    ),
  },
] as ColumnDef<SupplierRouterOutputs["getAll"]["data"][0]>[];

export function DataTableDemo() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const { data: dataSupplier, isLoading } = api.supplier.getAll.useQuery({});

  const table = useReactTable({
    data: dataSupplier?.data ?? [],
    columns: journalColumn,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  if (isLoading) {
    return "loading....";
  }
  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-4">
        <Input
          placeholder="Filter nama..."
          value={(table.getColumn("nama")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("nama")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <Link href={paths.dataMaster.supplier.new}>
          <Button>
            <PlusIcon />
            Tambah Supplier
          </Button>
        </Link>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={journalColumn.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
