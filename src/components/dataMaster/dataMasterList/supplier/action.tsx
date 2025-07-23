"use client";

import { paths } from "@/paths/paths";
import { Edit, Eye, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FC, useState } from "react";

import { SupplierRouterOutputs } from "@/server/supplier";

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

import DetailSupplierModal from "./detailSupplierModal";

interface SupplierActionProps {
  data: SupplierRouterOutputs["getAll"]["data"][0];
  className?: string;
}

const SupplierAction: FC<SupplierActionProps> = ({ data, className }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const handleDeleteSupplier = async (id: string) => {
    alert("product delete, API NOT COMPLETE");
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
          <Link href={paths.dataMaster.supplier.edit(data.id)}>
            <DropdownMenuItem className="cursor-pointer">
              <Edit className="mr-2 h-4 w-4 text-green-500" />
              <span>Edit</span>
            </DropdownMenuItem>
          </Link>

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
          <DetailSupplierModal
            id={data.id}
            name={data.nama}
            alamat={data.alamat ?? "-"}
            open={open}
            onOpenChange={setOpen}
          />
        </div>
        <div>
          <DeleteModal
            id={data.id}
            name={data.nama}
            //TODO: handle delete
            handleDelete={() => handleDeleteSupplier(data.id)}
            open={openDeleteModal}
            onOpenChange={setOpenDeleteModal}
          />
        </div>
      </DropdownMenu>
    </div>
  );
};

export default SupplierAction;
