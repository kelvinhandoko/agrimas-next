import { Text } from "@radix-ui/themes";
import { Eye } from "lucide-react";
import { useState } from "react";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function DetailSupplierModal({
  name,
  alamat,
}: {
  id: string;
  name: string;
  alamat: string;
}) {
  const [open, setOpen] = useState(false);

  const fallbackName = (name: string) => {
    const result = name
      .split(" ")
      .slice(0, 2)
      .map((word) => word[0])
      .join("")
      .toUpperCase();

    return result;
  };
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Eye className="cursor-pointer text-[#624DE3]" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-x-3">
            <Avatar className="h-[70px] w-[70px]">
              <AvatarFallback>{fallbackName(name)}</AvatarFallback>
            </Avatar>
            <Text>{name}</Text>
          </AlertDialogTitle>
          <AlertDialogDescription>
            <span>
              <Text>Name</Text>
              <Text className="block text-base text-black">{name}</Text>
            </span>
            <span className="mt-4 block">
              <Text>Alamat</Text>
              <Text className="block text-base text-black">{alamat}</Text>
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button variant={"destructiveOnline"} onClick={() => setOpen(false)}>
            Tutup
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
