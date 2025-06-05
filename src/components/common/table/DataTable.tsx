"use client";

import { LIMIT } from "@/constant";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

import { cn } from "@/lib/utils";

import { SearchInput } from "@/components/common/input/SearchInput";
import { DataTablePagination } from "@/components/common/table/DataTablePagination";
import { columnAlign } from "@/components/common/table/tableHelper";
import { TableRowAnimation } from "@/components/motion/variant";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  className?: string;
  hideColumn?: (keyof TData | (string & {}))[];
  withNumber?: boolean;
  canSelectRow?: boolean;
  totalData?: number;
  isLoading?: boolean;
  path?: string;
  buttonAddName?: string;
  totalPage?: number;
  titleTable?: string;
  searchAble?: boolean;
  buttonNew?: boolean;
  searchPlaceholder?: string;
}

const DataTable = <TData, TValue>({
  columns,
  data,
  className,
  hideColumn = [],
  totalPage = 1,
  withNumber = false,
  canSelectRow = false,
  isLoading = false,
  path,
  totalData,
  searchPlaceholder = "Search...",
  searchAble = false,
  buttonAddName,
  titleTable,
  buttonNew = true,
}: DataTableProps<TData, TValue>) => {
  const [rowSelection, setRowSelection] = useState({});
  const searchParams = useSearchParams();

  const limit = Number(searchParams.get("limit")) || LIMIT;
  const page = Number(searchParams.get("page")) || 1;

  const columnVisibility = columns.reduce(
    (visibilityMap, column) => {
      if (hideColumn.includes(column.id as keyof TData)) {
        visibilityMap[column.id!] = false;
      }
      return visibilityMap;
    },
    {} as Record<string, boolean>,
  );

  const table = useReactTable({
    data,
    columns,
    enableRowSelection: canSelectRow,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    manualPagination: true,
    autoResetPageIndex: false,
    initialState: {
      pagination: {
        pageSize: limit,
      },
    },
    state: {
      rowSelection,
      columnVisibility,
    },
  });

  return (
    <div className={cn("w-full", className)}>
      {/* Enhanced Header Section */}
      <div className="mb-6 md:mb-8">
        {/* Title Section */}
        <div className="mb-6">
          <h2 className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-2xl font-bold tracking-tight text-gray-900 text-transparent md:text-3xl">
            {titleTable ?? "Data Table"}{" "}
            {/* <span className="text-muted-foreground">
              {totalData && totalData}
            </span> */}
          </h2>
        </div>

        {/* Controls Section */}
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          {searchAble && (
            <div className="relative w-full sm:w-80">
              <SearchInput
                placeholder={searchPlaceholder}
                className="h-11 w-full rounded-xl border-gray-200 bg-white pl-4 pr-4 shadow-sm transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          )}

          {buttonNew && (
            <Link href={path ?? ""} className="w-full sm:w-auto">
              <Button className="h-11 w-full transform rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-6 text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:from-blue-700 hover:to-blue-800 hover:shadow-xl sm:w-auto">
                <PlusIcon className="mr-2 h-4 w-4" />
                <span className="font-semibold">
                  {buttonAddName ?? "tambah"}
                </span>
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Desktop Table View */}
      <Card className="hidden overflow-hidden rounded-2xl border-0 bg-white/70 shadow-xl backdrop-blur-sm md:block">
        <CardContent className="p-0">
          <div className="overflow-hidden">
            <div className="overflow-x-auto">
              <Table className="w-full">
                {/* Sticky Enhanced Header */}
                <TableHeader className="sticky top-0 z-10 border-b border-gray-200/60 bg-gradient-to-r from-gray-50 to-gray-100/80">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow
                      key={headerGroup.id}
                      className="hover:bg-transparent"
                    >
                      {withNumber && (
                        <TableHead className="h-14 w-16 border-r border-gray-200/40 text-center font-semibold text-gray-700">
                          <div className="flex h-full items-center justify-center">
                            #
                          </div>
                        </TableHead>
                      )}
                      {headerGroup.headers.map((header) => (
                        <TableHead
                          key={header.id}
                          className={cn(
                            "h-14 border-r border-gray-200/40 bg-gradient-to-b from-transparent to-gray-50/30 px-6 font-semibold text-gray-700 last:border-r-0",
                            columnAlign(header.column.columnDef.meta),
                          )}
                        >
                          <div className="flex h-full items-center">
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext(),
                                )}
                          </div>
                        </TableHead>
                      ))}
                    </TableRow>
                  ))}
                </TableHeader>

                <TableBody className="divide-y divide-gray-100">
                  {isLoading ? (
                    <>
                      {Array.from({ length: 5 }).map((_, index) => (
                        <TableRow key={index} className="hover:bg-transparent">
                          {withNumber && (
                            <TableCell className="h-16 border-r border-gray-100/60">
                              <Skeleton className="mx-auto h-4 w-8 rounded-md" />
                            </TableCell>
                          )}
                          {columns.map((_, colIndex) => (
                            <TableCell
                              key={colIndex}
                              className="h-16 border-r border-gray-100/60 px-6 last:border-r-0"
                            >
                              <Skeleton className="h-4 w-full rounded-md" />
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </>
                  ) : (
                    <>
                      {table.getRowModel().rows.length ? (
                        <>
                          {table.getRowModel().rows.map((row, index) => (
                            <TableRow
                              animate="visible"
                              initial="hidden"
                              variants={TableRowAnimation}
                              custom={index % 20}
                              key={row.id}
                              onClick={row.getToggleExpandedHandler()}
                              className={cn(
                                "group duration-200 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-transparent",
                                row.getCanExpand()
                                  ? "cursor-pointer hover:shadow-sm"
                                  : "cursor-default",
                                row.getIsExpanded()
                                  ? "border-b-0"
                                  : "border-b border-gray-100",
                                index % 2 === 1 ? "bg-gray-50/30" : "bg-white",
                                "h-16",
                              )}
                              data-state={row.getIsSelected() && "selected"}
                            >
                              {withNumber && (
                                <TableCell className="border-r border-gray-100/60 text-center font-medium text-gray-600">
                                  <div className="flex h-full items-center justify-center">
                                    <span className="rounded-md bg-gray-100 px-2 py-1 text-sm transition-colors duration-200 group-hover:bg-blue-100">
                                      {row.index + 1 + limit * (page - 1)}
                                    </span>
                                  </div>
                                </TableCell>
                              )}
                              {row.getVisibleCells().map((cell) => (
                                <TableCell
                                  className={cn(
                                    "border-r border-gray-100/60 px-6 py-4 text-gray-700 transition-colors duration-200 last:border-r-0 group-hover:text-gray-900",
                                    columnAlign(cell.column.columnDef.meta),
                                  )}
                                  key={cell.id}
                                >
                                  <div className="flex h-full items-center">
                                    {flexRender(
                                      cell.column.columnDef.cell,
                                      cell.getContext(),
                                    )}
                                  </div>
                                </TableCell>
                              ))}
                            </TableRow>
                          ))}
                        </>
                      ) : (
                        <TableRow className="hover:bg-transparent">
                          <TableCell
                            colSpan={
                              withNumber ? columns.length + 1 : columns.length
                            }
                            className="h-32 text-center"
                          >
                            <div className="flex flex-col items-center justify-center space-y-3">
                              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                                <svg
                                  className="h-8 w-8 text-gray-400"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m0 0V9a2 2 0 012-2h2m0 0V6a2 2 0 012-2h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 01.293.707V9a2 2 0 012 2v2m0 0h2"
                                  />
                                </svg>
                              </div>
                              <div className="space-y-1">
                                <p className="font-medium text-gray-500">
                                  Belum ada data
                                </p>
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </>
                  )}
                </TableBody>

                {/* Enhanced Footer */}
                <TableFooter className="border-t border-gray-200/60 bg-gradient-to-r from-gray-50 to-gray-100/80">
                  <TableRow className="hover:bg-transparent">
                    <TableCell
                      colSpan={withNumber ? columns.length + 1 : columns.length}
                      className="p-0"
                    >
                      <div className="px-6 py-4">
                        <DataTablePagination totalPage={totalPage} />
                      </div>
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mobile Card View */}
      <div className="space-y-4 md:hidden">
        {isLoading ? (
          <>
            {Array.from({ length: 3 }).map((_, index) => (
              <Card
                key={index}
                className="overflow-hidden rounded-xl border-0 bg-white shadow-lg"
              >
                <CardContent className="space-y-3 p-4">
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-5 w-20 rounded-md" />
                    <Skeleton className="h-6 w-8 rounded-full" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full rounded-md" />
                    <Skeleton className="h-4 w-3/4 rounded-md" />
                    <Skeleton className="h-4 w-1/2 rounded-md" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </>
        ) : (
          <div className="space-y-4">
            {table.getRowModel().rows.length > 0 ? (
              <>
                {table.getRowModel().rows.map((row) => {
                  const actionCell = row
                    .getVisibleCells()
                    .find(
                      (cell) =>
                        cell.column.id === "action" ||
                        cell.column.id === "actions",
                    );
                  const otherCells = row
                    .getVisibleCells()
                    .filter(
                      (cell) =>
                        cell.column.id !== "action" &&
                        cell.column.id !== "actions" &&
                        cell.column.id !== "expand",
                    );

                  return (
                    <div key={row.id} className="space-y-2">
                      <Card className="overflow-hidden shadow-sm transition-shadow duration-200 hover:shadow-md">
                        <div className="relative">
                          {/* Expandable button for mobile */}

                          <Table>
                            <TableBody>
                              {actionCell && (
                                <TableRow>
                                  <TableCell className="font-bold text-muted-foreground">
                                    Actions
                                  </TableCell>
                                  <TableCell className="text-end">
                                    {flexRender(
                                      actionCell.column.columnDef.cell,
                                      actionCell.getContext(),
                                    )}
                                  </TableCell>
                                </TableRow>
                              )}
                              {otherCells.map((cell) => (
                                <TableRow
                                  key={cell.id}
                                  className="border-b-0 last:border-b"
                                >
                                  <TableCell className="py-3 font-semibold capitalize text-muted-foreground">
                                    {typeof cell.column.columnDef.header ===
                                    "string"
                                      ? cell.column.columnDef.header
                                      : cell.column.id}
                                  </TableCell>
                                  <TableCell className="py-3">
                                    <div className="flex justify-end">
                                      {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext(),
                                      )}
                                    </div>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      </Card>
                    </div>
                  );
                })}
              </>
            ) : (
              <Card className="p-8">
                <div className="text-center text-muted-foreground">
                  <div className="mb-2 text-lg">📋</div>
                  <p>belum ada data</p>
                </div>
              </Card>
            )}
          </div>
        )}

        {/* Mobile Pagination */}
        <Card className="overflow-hidden rounded-xl border-0 bg-white shadow-lg">
          <CardContent className="p-4">
            <DataTablePagination totalPage={totalPage} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DataTable;
