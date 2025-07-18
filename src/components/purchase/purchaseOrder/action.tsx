"use client";

import { paths } from "@/paths/paths";
import { Eye, MoreVertical, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { type FC, useState } from "react";

import { cn } from "@/lib/utils";

import { PurchaseRouterOutputs } from "@/server/purchase/purchase.router";

import DeleteModal from "@/components/DeleteModal";
import DropdownTriggerIcon from "@/components/DropdownTriggerIcon";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface PurchaseOrderActionProps {
  data: PurchaseRouterOutputs["getAll"]["data"][0];
  className?: string;
}

const PurchaseOrderAction: FC<PurchaseOrderActionProps> = ({
  data,
  className,
}) => {
  const router = useRouter();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const handleDetail = () => {
    router.push(`${paths.purchase.purchaseOrder.detail(data.id)}`);
  };
  const handleEdit = () => {
    router.push(`${paths.purchase.purchaseOrder.edit(data.id)}`);
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <DropdownTriggerIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="z-[99999] w-48">
          <DropdownMenuLabel className="text-xs font-normal text-slate-500">
            Aksi untuk #{data.ref}{" "}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          {/* View Detail Action */}
          <DropdownMenuItem className="cursor-pointer" onClick={handleDetail}>
            <Eye className="mr-2 h-4 w-4 text-blue-500" />
            <span>Detail</span>
          </DropdownMenuItem>

          {/* Edit Action */}
          {/* <DropdownMenuItem onClick={handleEdit} className="cursor-pointer">
            <Edit className="mr-2 h-4 w-4 text-green-500" />
            <span>Edit</span>
          </DropdownMenuItem> */}

          {/* General Ledger Action */}
          <DropdownMenuItem
            onClick={() => setOpenDeleteModal(true)}
            className="cursor-pointer"
          >
            <Trash2 className="mr-2 h-4 w-4 text-red-500" />
            <span>Hapus</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
        <div>
          <DeleteModal
            id={data.id}
            name={data.ref}
            handleDelete={() => {}}
            open={openDeleteModal}
            onOpenChange={setOpenDeleteModal}
          />
        </div>
      </DropdownMenu>
    </div>
  );
};

export default PurchaseOrderAction;
