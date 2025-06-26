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
import {
  AlertCircle,
  Database,
  Filter,
  PlusIcon,
  RefreshCw,
  SearchX,
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { type ReactNode, useState } from "react";

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
  isError?: boolean;
  path?: string;
  buttonAddName?: string;
  totalPage?: number;
  titleTable?: string;
  searchAble?: boolean;
  onAddNew?: () => void;
  onRetry?: () => void;
  filterComponent?: ReactNode;
  searchPlaceholder?: string;
  emptyTitle?: string;
  emptyDescription?: string;
  emptyIcon?: React.ReactNode;
  searchEmptyTitle?: string;
  searchEmptyDescription?: string;
}

const DataTable = <TData, TValue>({
  columns,
  data,
  className,
  hideColumn = [],
  filterComponent,
  totalPage = 1,
  withNumber = false,
  canSelectRow = false,
  isLoading = false,
  isError = false,
  path,
  totalData,
  searchPlaceholder = "Search...",
  searchAble = false,
  buttonAddName,
  titleTable,
  onAddNew,
  onRetry,
  emptyTitle,
  emptyDescription,
  emptyIcon,
  searchEmptyTitle = "Tidak ditemukan",
  searchEmptyDescription = "Coba gunakan kata kunci yang berbeda",
}: DataTableProps<TData, TValue>) => {
  const [rowSelection, setRowSelection] = useState({});
  const searchParams = useSearchParams();

  const limit = Number(searchParams.get("limit")) || LIMIT;
  const page = Number(searchParams.get("page")) || 1;
  const searchQuery = searchParams.get("search") || "";

  // Determine if "Add" button should be shown
  const showAddButton = !!(path || onAddNew);

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

  // Enhanced Empty State Components
  const ErrorState = () => (
    <div className="flex flex-col items-center justify-center px-4 py-16">
      <div className="relative mb-6">
        <div className="rounded-full bg-destructive/10 p-4">
          <AlertCircle className="h-12 w-12 text-destructive" />
        </div>
        <div className="absolute -right-1 -top-1 h-4 w-4 animate-pulse rounded-full bg-destructive" />
      </div>
      <h3 className="mb-2 text-lg font-semibold text-destructive">
        Gagal memuat data
      </h3>
      <p className="mb-6 max-w-md text-center text-sm text-muted-foreground">
        Terjadi kesalahan saat mengambil data. Silakan coba lagi atau hubungi
        administrator jika masalah berlanjut.
      </p>
      {onRetry && (
        <Button onClick={onRetry} variant="outline" size="sm">
          <RefreshCw className="mr-2 h-4 w-4" />
          Coba Lagi
        </Button>
      )}
    </div>
  );

  const SearchEmptyState = () => (
    <div className="flex flex-col items-center justify-center px-4 py-16">
      <div className="relative mb-6">
        <div className="rounded-full bg-muted p-4">
          <SearchX className="h-12 w-12 text-muted-foreground" />
        </div>
        <div className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-orange-500" />
      </div>
      <h3 className="mb-2 text-lg font-semibold text-foreground">
        {searchEmptyTitle}
      </h3>
      <p className="mb-4 max-w-md text-center text-sm text-muted-foreground">
        {searchEmptyDescription} untuk {searchQuery}
      </p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button
          variant="outline"
          size="sm"
          onClick={() => (window.location.href = window.location.pathname)}
        >
          <Filter className="mr-2 h-4 w-4" />
          Hapus Filter
        </Button>
        {showAddButton && (
          <>
            {path ? (
              <Link href={path}>
                <Button size="sm">
                  <PlusIcon className="mr-2 h-4 w-4" />
                  {buttonAddName || "Tambah Data"}
                </Button>
              </Link>
            ) : onAddNew ? (
              <Button onClick={onAddNew} size="sm">
                <PlusIcon className="mr-2 h-4 w-4" />
                {buttonAddName || "Tambah Data"}
              </Button>
            ) : null}
          </>
        )}
      </div>
    </div>
  );

  const InitialEmptyState = () => {
    const defaultTitle = titleTable
      ? `Belum ada ${titleTable.toLowerCase()}`
      : "Belum ada data";
    const defaultDescription = titleTable
      ? `Mulai dengan menambahkan ${titleTable.toLowerCase()} pertama Anda`
      : "Mulai dengan menambahkan data pertama Anda";

    return (
      <div className="flex flex-col items-center justify-center px-4 py-16">
        <div className="relative mb-6">
          <div className="rounded-full bg-primary/10 p-6">
            {emptyIcon || <Database className="h-16 w-16 text-primary" />}
          </div>
          <div className="absolute -bottom-2 -right-2 rounded-full bg-background p-1 shadow-lg">
            <PlusIcon className="h-6 w-6 text-primary" />
          </div>
        </div>
        <h3 className="mb-3 text-xl font-semibold text-foreground">
          {emptyTitle || defaultTitle}
        </h3>
        <p className="mb-8 max-w-md text-center text-sm leading-relaxed text-muted-foreground">
          {emptyDescription || defaultDescription}
        </p>
        {showAddButton && (
          <div className="flex flex-col gap-3 sm:flex-row">
            {path ? (
              <Link href={path}>
                <Button size="lg" className="min-w-[160px]">
                  <PlusIcon className="mr-2 h-5 w-5" />
                  {buttonAddName || "Tambah Data"}
                </Button>
              </Link>
            ) : onAddNew ? (
              <Button onClick={onAddNew} size="lg" className="min-w-[160px]">
                <PlusIcon className="mr-2 h-5 w-5" />
                {buttonAddName || "Tambah Data"}
              </Button>
            ) : null}
          </div>
        )}
      </div>
    );
  };

  const MobileEmptyState = ({
    icon,
    title,
    description,
    action,
  }: {
    icon: React.ReactNode;
    title: string;
    description: string;
    action?: React.ReactNode;
  }) => (
    <Card className="p-8">
      <div className="text-center">
        <div className="mb-4 flex justify-center">
          <div className="rounded-full bg-muted p-3">{icon}</div>
        </div>
        <h3 className="mb-2 text-lg font-semibold">{title}</h3>
        <p className="mb-6 text-sm text-muted-foreground">{description}</p>
        {action}
      </div>
    </Card>
  );

  const renderDesktopEmptyState = () => {
    if (isError) return <ErrorState />;
    if (searchQuery && data.length === 0) return <SearchEmptyState />;
    if (data.length === 0) return <InitialEmptyState />;
    return null;
  };

  const renderMobileEmptyState = () => {
    if (isError) {
      return (
        <MobileEmptyState
          icon={<AlertCircle className="h-8 w-8 text-destructive" />}
          title="Gagal memuat data"
          description="Terjadi kesalahan saat mengambil data"
          action={
            onRetry && (
              <Button onClick={onRetry} variant="outline" size="sm">
                <RefreshCw className="mr-2 h-4 w-4" />
                Coba Lagi
              </Button>
            )
          }
        />
      );
    }

    if (searchQuery && data.length === 0) {
      return (
        <MobileEmptyState
          icon={<SearchX className="h-8 w-8 text-muted-foreground" />}
          title={searchEmptyTitle}
          description={`${searchEmptyDescription} untuk "${searchQuery}"`}
          action={
            <div className="flex flex-col gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  (window.location.href = window.location.pathname)
                }
              >
                <Filter className="mr-2 h-4 w-4" />
                Hapus Filter
              </Button>
              {showAddButton && (
                <>
                  {path ? (
                    <Link href={path}>
                      <Button size="sm">
                        <PlusIcon className="mr-2 h-4 w-4" />
                        {buttonAddName || "Tambah Data"}
                      </Button>
                    </Link>
                  ) : onAddNew ? (
                    <Button onClick={onAddNew} size="sm">
                      <PlusIcon className="mr-2 h-4 w-4" />
                      {buttonAddName || "Tambah Data"}
                    </Button>
                  ) : null}
                </>
              )}
            </div>
          }
        />
      );
    }

    if (data.length === 0) {
      const defaultTitle = titleTable
        ? `Belum ada ${titleTable.toLowerCase()}`
        : "Belum ada data";
      const defaultDescription = titleTable
        ? `Mulai dengan menambahkan ${titleTable.toLowerCase()} pertama`
        : "Mulai dengan menambahkan data pertama";

      return (
        <MobileEmptyState
          icon={emptyIcon || <Database className="h-8 w-8 text-primary" />}
          title={emptyTitle || defaultTitle}
          description={emptyDescription || defaultDescription}
          action={
            showAddButton && (
              <>
                {path ? (
                  <Link href={path}>
                    <Button size="sm" className="w-full">
                      <PlusIcon className="mr-2 h-4 w-4" />
                      {buttonAddName || "Tambah Data"}
                    </Button>
                  </Link>
                ) : onAddNew ? (
                  <Button onClick={onAddNew} size="sm" className="w-full">
                    <PlusIcon className="mr-2 h-4 w-4" />
                    {buttonAddName || "Tambah Data"}
                  </Button>
                ) : null}
              </>
            )
          }
        />
      );
    }

    return null;
  };

  return (
    <div className={cn("w-full", className)}>
      {/* Enhanced Header Section */}
      <div className="mb-6 md:mb-8">
        {/* Title Section */}
        <div className="mb-6">
          <div className="mb-2 flex items-center gap-3">
            <h2 className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-2xl font-bold tracking-tight text-gray-900 text-transparent md:text-3xl">
              {titleTable ?? "Data Table"}
            </h2>
            {totalData !== undefined && (
              <div className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1">
                <Database className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">
                  {totalData}
                </span>
              </div>
            )}
          </div>
          {totalData !== undefined && totalData > 0 && (
            <p className="text-sm text-muted-foreground">
              Menampilkan {Math.min(limit * (page - 1) + 1, totalData)}-
              {Math.min(limit * page, totalData)} dari {totalData} data
            </p>
          )}
        </div>

        {/* Controls Section */}
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <div className="flex gap-1">
            {searchAble && (
              <div className="relative w-full sm:w-80">
                <SearchInput
                  placeholder={searchPlaceholder}
                  className="h-11 w-full rounded-xl border-gray-200 bg-white pl-4 pr-4 shadow-sm transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            )}
            {filterComponent && <>{filterComponent}</>}
          </div>

          {showAddButton && (
            <>
              {path ? (
                <Link href={path} className="w-full sm:w-auto">
                  <Button className="h-11 w-full transform rounded-xl px-6 text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:from-blue-700 hover:to-blue-800 hover:shadow-xl sm:w-auto">
                    <PlusIcon className="mr-2 h-4 w-4" />
                    <span className="font-semibold">
                      {buttonAddName ?? "Tambah"}
                    </span>
                  </Button>
                </Link>
              ) : (
                <Button
                  onClick={onAddNew}
                  className="h-11 w-full transform rounded-xl px-6 text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:from-blue-700 hover:to-blue-800 hover:shadow-xl sm:w-auto"
                >
                  <PlusIcon className="mr-2 h-4 w-4" />
                  <span className="font-semibold">
                    {buttonAddName ?? "Tambah"}
                  </span>
                </Button>
              )}
            </>
          )}
        </div>
      </div>

      {/* Desktop Table View */}
      <Card className="hidden overflow-hidden rounded-2xl border-0 bg-white/70 shadow-xl backdrop-blur-sm md:block">
        <CardContent className="p-0">
          <div className="overflow-hidden">
            <div className="overflow-x-auto">
              <Table className="w-full">
                {/* Enhanced Header */}
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
                            className="h-auto p-0"
                          >
                            {renderDesktopEmptyState()}
                          </TableCell>
                        </TableRow>
                      )}
                    </>
                  )}
                </TableBody>

                {/* Enhanced Footer */}
                {data.length > 0 && (
                  <TableFooter className="border-t border-gray-200/60 bg-gradient-to-r from-gray-50 to-gray-100/80">
                    <TableRow className="hover:bg-transparent">
                      <TableCell
                        colSpan={
                          withNumber ? columns.length + 1 : columns.length
                        }
                        className="p-0"
                      >
                        <div className="px-6 py-4">
                          <DataTablePagination totalPage={totalPage} />
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableFooter>
                )}
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
              renderMobileEmptyState()
            )}
          </div>
        )}

        {/* Mobile Pagination */}
        {data.length > 0 && (
          <Card className="overflow-hidden rounded-xl border-0 bg-white shadow-lg">
            <CardContent className="p-4">
              <DataTablePagination totalPage={totalPage} />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default DataTable;
