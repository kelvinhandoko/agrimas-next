"use client";

import { Edit, Eye, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { type FC, useState } from "react";

import { SalesPersonRouterOutputs } from "@/server/salesPerson/sales-person.router";

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

import DetailSalesModal from "./DetailSalesModal";

interface SalesActionProps {
  data: SalesPersonRouterOutputs["findAll"]["data"][0];
  className?: string;
}

const SalesAction: FC<SalesActionProps> = ({ data, className }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const handleEdit = () => {
    router.push(`/chart-of-accounts/${data.id}/edit`);
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <DropdownTriggerIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuLabel className="font-medium">
            Aksi untuk {data.name}{" "}
          </DropdownMenuLabel>
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
          <DetailSalesModal
            name={data.name}
            open={open}
            onOpenChange={setOpen}
          />
        </div>
        <div>
          <DeleteModal
            id={data.id}
            name={data.name}
            handleDelete={() => {}}
            open={openDeleteModal}
            onOpenChange={setOpenDeleteModal}
          />
        </div>
      </DropdownMenu>
    </div>
  );
};

export default SalesAction;
