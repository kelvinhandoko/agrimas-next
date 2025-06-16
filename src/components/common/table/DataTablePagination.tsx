"use client";

import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { useSearchParams } from "next/navigation";

import { cn } from "@/lib/utils";

import { useUpdateParams } from "@/hooks/use-update-params";

import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";

interface DataTablePaginationProps {
  totalPage: number;
  className?: string;
}

export function DataTablePagination({
  totalPage,
  className,
}: DataTablePaginationProps) {
  const searchParams = useSearchParams();
  const { updateParams } = useUpdateParams();

  const page = parseInt(searchParams.get("page") ?? "1");
  const showPagination = totalPage > 1;

  const goToPage = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPage) {
      updateParams("page", String(pageNumber));
    }
  };

  const renderPageButton = (pageNumber: number) => (
    <PaginationItem key={pageNumber}>
      <Button
        variant={pageNumber === page ? "default" : "ghost"}
        size="sm"
        className={cn("h-9 w-9 p-0 transition-all duration-200")}
        onClick={() => goToPage(pageNumber)}
      >
        {pageNumber}
      </Button>
    </PaginationItem>
  );

  const generatePageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];

    // Mobile: Show fewer pages (max 5)
    const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
    const maxVisiblePages = isMobile ? 5 : 7;

    if (totalPage <= maxVisiblePages) {
      // Show all pages if within limit
      for (let i = 1; i <= totalPage; i++) {
        pages.push(i);
      }
    } else {
      if (isMobile) {
        // Mobile logic: More compact
        pages.push(1);

        if (page <= 3) {
          // Near beginning
          for (let i = 2; i <= 4; i++) {
            if (i <= totalPage) pages.push(i);
          }
          if (totalPage > 4) {
            pages.push("ellipsis");
            pages.push(totalPage);
          }
        } else if (page >= totalPage - 2) {
          // Near end
          pages.push("ellipsis");
          for (let i = totalPage - 3; i <= totalPage - 1; i++) {
            if (i > 1) pages.push(i);
          }
          pages.push(totalPage);
        } else {
          // Middle
          pages.push("ellipsis");
          pages.push(page);
          pages.push("ellipsis");
          pages.push(totalPage);
        }
      } else {
        // Desktop logic: Your original enhanced
        pages.push(1);

        if (page <= 4) {
          for (let i = 2; i <= 5; i++) {
            pages.push(i);
          }
          pages.push("ellipsis");
          pages.push(totalPage);
        } else if (page >= totalPage - 3) {
          pages.push("ellipsis");
          for (let i = totalPage - 4; i <= totalPage - 1; i++) {
            pages.push(i);
          }
          pages.push(totalPage);
        } else {
          pages.push("ellipsis");
          for (let i = page - 1; i <= page + 1; i++) {
            pages.push(i);
          }
          pages.push("ellipsis");
          pages.push(totalPage);
        }
      }
    }

    return pages;
  };

  return showPagination ? (
    <div className={cn("flex items-center justify-center p-2", className)}>
      {/* Mobile Page Info */}
      <div className="flex flex-col items-center gap-3 sm:hidden">
        <div className="text-xs text-muted-foreground">
          Halaman {page} dari {totalPage}
        </div>
        <Pagination>
          <PaginationContent className="gap-1">
            <Button
              variant={page > 1 ? "default" : "outline"}
              size="sm"
              className="h-8 gap-1 px-2"
              onClick={() => goToPage(page - 1)}
              disabled={page === 1}
            >
              <ChevronLeft className="h-3 w-3" />
              <span className="text-xs">Prev</span>
            </Button>

            {generatePageNumbers().map((item, idx) =>
              typeof item === "number" ? (
                <PaginationItem key={item}>
                  <Button
                    variant={item === page ? "default" : "outline"}
                    size="sm"
                    className={cn(
                      "h-8 w-8 p-0 text-xs transition-all duration-200",
                    )}
                    onClick={() => goToPage(item)}
                  >
                    {item}
                  </Button>
                </PaginationItem>
              ) : (
                <PaginationItem key={`ellipsis-${idx}`}>
                  <div className="flex h-8 w-6 items-center justify-center">
                    <MoreHorizontal className="h-3 w-3 text-muted-foreground" />
                  </div>
                </PaginationItem>
              ),
            )}

            <Button
              variant={page >= totalPage ? "outline" : "default"}
              size="sm"
              className="h-8 gap-1 px-2"
              onClick={() => goToPage(page + 1)}
              disabled={page >= totalPage}
            >
              <span className="text-xs">Next</span>
              <ChevronRight className="h-3 w-3" />
            </Button>
          </PaginationContent>
        </Pagination>
      </div>

      {/* Desktop Pagination */}
      <div className="hidden items-center justify-center sm:flex">
        <Pagination>
          <PaginationContent className="gap-1">
            <Button
              variant="outline"
              size="sm"
              className="h-9 gap-1 px-3"
              onClick={() => goToPage(page - 1)}
              disabled={page === 1}
            >
              <ChevronLeft className="h-4 w-4" />
              <span>prev</span>
            </Button>

            {generatePageNumbers().map((item, idx) =>
              typeof item === "number" ? (
                renderPageButton(item)
              ) : (
                <PaginationItem key={`ellipsis-${idx}`}>
                  <div className="flex h-9 w-9 items-center justify-center">
                    <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                  </div>
                </PaginationItem>
              ),
            )}

            <Button
              variant={page >= totalPage ? "outline" : "outline"}
              size="sm"
              className="h-9 gap-1 px-3"
              onClick={() => goToPage(page + 1)}
              disabled={page >= totalPage}
            >
              <span>next</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  ) : null;
}
