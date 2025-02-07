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

import { columnAlign } from "@/components/common/table/tableHelper";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
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
  isLoading?: boolean;
  path?: string;
  colFilterName?: string;
  buttonAddName?: string;
  titleTable?: string;
}

const DataTable = <TData, TValue>({
  columns,
  data,
  className,
  hideColumn = [],
  withNumber = false,
  canSelectRow = false,
  isLoading = false,
  path,
  colFilterName,
  buttonAddName,
  titleTable,
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
    <Card className={className}>
      <h2 className="mt-3 text-2xl font-bold tracking-tight">
        {titleTable || "Data User"}
      </h2>
      <CardContent>
        <div className="flex items-center justify-between py-4">
          <Input
            placeholder="Search..."
            value={
              (table
                .getColumn(colFilterName ?? "")
                ?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table
                .getColumn(colFilterName ?? "")
                ?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <Link href={path ? path : ""}>
            <Button>
              <PlusIcon />
              {buttonAddName}
            </Button>
          </Link>
        </div>
        <Table>
          <TableHeader className="table-header-group">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {withNumber && <TableHead className="w-10">no</TableHead>}
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className={cn(columnAlign(header.column.columnDef.meta))}
                  >
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
            {isLoading ? (
              <>
                {Array.from({ length: 5 }).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      <Skeleton className="h-full w-full" />
                    </TableCell>
                  </TableRow>
                ))}
              </>
            ) : (
              <>
                {table.getRowModel().rows.length ? (
                  <>
                    {table.getRowModel().rows.map((row) => (
                      <TableRow
                        key={row.id}
                        onClick={row.getToggleExpandedHandler()}
                        className={cn(
                          row.getCanExpand()
                            ? "cursor-pointer"
                            : "cursor-default",
                          row.getIsExpanded() ? "border-b-0" : "border-b",
                          "odd:bg-secondary",
                        )}
                        data-state={row.getIsSelected() && "selected"}
                      >
                        {withNumber && (
                          <TableCell className="text-balance text-center">
                            {row.index + 1 + limit * (page - 1)}
                          </TableCell>
                        )}
                        {row.getVisibleCells().map((cell) => (
                          <TableCell
                            className={cn(
                              "text-balance",
                              columnAlign(cell.column.columnDef.meta),
                            )}
                            key={cell.id}
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext(),
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </>
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={withNumber ? columns.length + 1 : columns.length}
                      className="h-24 text-center"
                    >
                      belum ada data.
                    </TableCell>
                  </TableRow>
                )}
              </>
            )}
          </TableBody>
          {/* {footer ? <>{footer}</> : null} */}
        </Table>
      </CardContent>
    </Card>
  );
};
export default DataTable;
