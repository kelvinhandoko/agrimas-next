"use client";

import { useSearchParams } from "next/navigation";

import { useUpdateParams } from "@/hooks/use-update-params";

import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "@/components/ui/pagination";

interface DataTablePaginationProps {
  totalPage: number;
}

export function DataTablePagination({ totalPage }: DataTablePaginationProps) {
  const searchParams = useSearchParams();
  const { updateParams } = useUpdateParams();

  const page = parseInt(searchParams.get("page") ?? "1");

  const showPagination = totalPage > 1;

  const renderPageButton = (pageNumber: number) => (
    <PaginationItem key={pageNumber}>
      <Button
        variant={pageNumber === page ? "default" : "outline"}
        onClick={() => updateParams("page", String(pageNumber))}
      >
        {pageNumber}
      </Button>
    </PaginationItem>
  );

  const generatePageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];

    if (totalPage <= 7) {
      for (let i = 1; i <= totalPage; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (page > 4) {
        pages.push("start-ellipsis");
      }

      const start = Math.max(2, page - 1);
      const end = Math.min(totalPage - 1, page + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (page < totalPage - 3) {
        pages.push("end-ellipsis");
      }

      pages.push(totalPage);
    }

    return pages;
  };

  return showPagination ? (
    <div className="flex items-center justify-between p-2">
      <div className="mx-auto flex w-fit items-center space-x-6 lg:space-x-8">
        <Pagination>
          <PaginationContent>
            <Button
              variant={page > 1 ? "default" : "outline"}
              onClick={() => updateParams("page", String(page - 1))}
              disabled={page === 1}
            >
              prev
            </Button>

            {generatePageNumbers().map((item, idx) =>
              typeof item === "number" ? (
                renderPageButton(item)
              ) : (
                <PaginationEllipsis key={idx} />
              ),
            )}

            <Button
              variant={page >= totalPage ? "outline" : "default"}
              onClick={() => updateParams("page", String(page + 1))}
              disabled={page >= totalPage}
            >
              next
            </Button>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  ) : null;
}
