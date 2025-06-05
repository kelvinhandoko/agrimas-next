"use client";

import { BookOpen, Edit, Eye, MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { type FC } from "react";

import { cn } from "@/lib/utils";

import { type AccountRouterOutputs } from "@/server/account";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ChartOfAccountRowActionProps {
  data: AccountRouterOutputs["get"]["data"][number];
  onEdit?: (id: string) => void;
  onView?: (id: string) => void;
  onGeneralLedger?: (id: string) => void;
  className?: string;
}

const ChartOfAccountRowAction: FC<ChartOfAccountRowActionProps> = ({
  data,
  onEdit,
  onView,
  onGeneralLedger,
  className,
}) => {
  const router = useRouter();

  // Default handlers if not provided
  const handleView = () => {
    if (onView) {
      onView(data.id);
    } else {
      router.push(`/chart-of-accounts/${data.id}`);
    }
  };

  const handleEdit = () => {
    if (onEdit) {
      onEdit(data.id);
    } else {
      router.push(`/chart-of-accounts/${data.id}/edit`);
    }
  };

  const handleGeneralLedger = () => {
    if (onGeneralLedger) {
      onGeneralLedger(data.id);
    } else {
      router.push(`/general-ledger/${data.id}`);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={cn("h-8 w-8 p-0 data-[state=open]:bg-muted", className)}
        >
          <span className="sr-only">Buka menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel className="font-medium">
          Aksi untuk {data.name || data.code}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {/* View Detail Action */}
        <DropdownMenuItem onClick={handleView} className="cursor-pointer">
          <Eye className="mr-2 h-4 w-4 text-blue-500" />
          <span>Detail</span>
        </DropdownMenuItem>

        {/* Edit Action */}
        <DropdownMenuItem onClick={handleEdit} className="cursor-pointer">
          <Edit className="mr-2 h-4 w-4 text-green-500" />
          <span>Edit</span>
        </DropdownMenuItem>

        {/* General Ledger Action */}
        <DropdownMenuItem
          onClick={handleGeneralLedger}
          className="cursor-pointer"
        >
          <BookOpen className="mr-2 h-4 w-4 text-purple-500" />
          <span>Buku Besar</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ChartOfAccountRowAction;
