"use client";

import { Edit, Eye, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { type FC, useState } from "react";

import { ProductRouterOutput } from "@/server/product/product.router";

import DeleteModal from "@/components/DeleteModal";
import DropdownTriggerIcon from "@/components/DropdownTriggerIcon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import DetailProductModal from "./detailProductModal";

interface ProductActionProps {
  data: ProductRouterOutput["getAll"]["data"][0];
  onEdit?: (id: string) => void;
  onView?: (id: string) => void;
  onGeneralLedger?: (id: string) => void;
  className?: string;
}

const ProductAction: FC<ProductActionProps> = ({
  data,
  onEdit,
  onView,
  onGeneralLedger,
  className,
}) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

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
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <DropdownTriggerIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuLabel className="font-medium">Aksi</DropdownMenuLabel>
          <DropdownMenuSeparator />

          {/* View Detail Action */}
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => setOpen(true)}
          >
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
            onClick={() => setOpenDeleteModal(true)}
            className="cursor-pointer"
          >
            <Trash2 className="mr-2 h-4 w-4 text-red-500" />
            <span>Hapus</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
        <div>
          <DetailProductModal
            id={data.id}
            name={data.name}
            price={data.sellingPrice}
            supplierId={data.supplierId}
            open={open}
            onOpenChange={setOpen}
          />
        </div>
        <div>
          <DeleteModal
            id={data.id}
            name={data.name}
            //TODO: handle delete
            handleDelete={() => console.log("error")}
            open={openDeleteModal}
            onOpenChange={setOpenDeleteModal}
          />
        </div>
      </DropdownMenu>
    </div>
  );
};

export default ProductAction;
