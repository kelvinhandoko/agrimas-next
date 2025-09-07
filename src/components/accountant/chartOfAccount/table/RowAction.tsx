"use client";

import { paths } from "@/paths/paths";
import { BookOpen, Edit, MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { type FC, useState } from "react";

import { cn } from "@/lib/utils";

import { type AccountRouterOutputs } from "@/server/account";

import DialogWrapper from "@/components/DialogWrapper";
import AccountForm from "@/components/accountant/chartOfAccount/form";
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
  onGeneralLedger?: (id: string) => void;
  className?: string;
}

const ChartOfAccountRowAction: FC<ChartOfAccountRowActionProps> = ({
  data,
  onGeneralLedger,
  className,
}) => {
  const router = useRouter();

  const [editOpen, setEditOpen] = useState(false);

  const handleGeneralLedger = () => {
    if (onGeneralLedger) {
      onGeneralLedger(data.id);
    } else {
      router.push(`${paths.accountant.generalLedger}/${data.id}`);
    }
  };

  return (
    <>
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

          {/* Edit Action */}
          <DropdownMenuItem
            onClick={() => setEditOpen(true)}
            className="cursor-pointer"
          >
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
      <DialogWrapper
        open={editOpen}
        onOpenChange={setEditOpen}
        title="edit akun"
      >
        <AccountForm
          data={data}
          onClose={() => setEditOpen(false)}
          type="EDIT"
        />
      </DialogWrapper>
    </>
  );
};

export default ChartOfAccountRowAction;
