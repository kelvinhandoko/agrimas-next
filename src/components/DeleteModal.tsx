import { Trash2, Trash2Icon } from "lucide-react";
import { type MouseEvent, useState } from "react";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

export default function DeleteModal({
  name,
  handleDelete,
  open,
  onOpenChange,
}: {
  id: string;
  name: string;
  handleDelete?: (event: MouseEvent<HTMLButtonElement>) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-x-3">
            <Trash2 className="text-red-600" />
            Hapus Data
          </AlertDialogTitle>
          <AlertDialogDescription>
            Apakah anda yakin ingin menghapus data {name}?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button
            variant={"destructiveOnline"}
            onClick={() => onOpenChange(false)}
          >
            Batal
          </Button>
          <Button variant={"destructive"} onClick={handleDelete}>
            Hapus
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
