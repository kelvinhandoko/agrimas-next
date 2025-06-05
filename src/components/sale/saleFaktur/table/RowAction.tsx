"use client";

import { ExternalLink, MoreVertical } from "lucide-react";
import Link from "next/link";
import { type FC, useState } from "react";

import { cn } from "@/lib/utils";

import { type SalesInvoiceRouterOutput } from "@/server/salesInvoice/sales-invoice.router";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface IProps {
  data: SalesInvoiceRouterOutput["get"]["data"][number];
}

const SalesInvoiceRowAction: FC<IProps> = ({ data }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "h-8 w-8 rounded-full p-0 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800",
            )}
          >
            <span className="sr-only">Sales Invoice actions</span>
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48">
          <DropdownMenuLabel className="text-xs font-normal text-slate-500">
            Invoice #{data.ref}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          <Link href={`/sale/sale-faktur/${data.id}`}>
            <DropdownMenuItem className="flex cursor-pointer items-center gap-2">
              <ExternalLink className="h-4 w-4 text-slate-500" />
              <span>Detail</span>
            </DropdownMenuItem>
          </Link>

          <DropdownMenuSeparator />
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default SalesInvoiceRowAction;
