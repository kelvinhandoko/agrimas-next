import { api } from "@/trpc/react";
import { formatPrice } from "@/utils/format-price";
import { Box, Text } from "@radix-ui/themes";
import { Eye, Trash2, Trash2Icon } from "lucide-react";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function DetailProductModal({
  id,
  name,
  price,
  supplierId,
}: {
  id: string;
  name: string;
  price?: number;
  supplierId: string;
}) {
  const [open, setOpen] = useState(false);
  const { data: supplierProduct } = api.supplier.getDetail.useQuery({
    id: supplierId,
  });

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
              <Text>Harga</Text>
              <Text className="block text-base text-black">
                {price ? formatPrice(price) : "-"}
              </Text>
            </span>
            <span className="mt-4 block">
              <Text>Nama Supplier</Text>
              <Text className="block text-base text-black">
                {supplierProduct ? supplierProduct?.nama : "-"}
              </Text>
            </span>
            <span className="mt-4 block">
              <Text>Alamat Supplier</Text>
              <Text className="block text-base text-black">
                {supplierProduct?.alamat ? supplierProduct?.alamat : "-"}
              </Text>
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button variant={"outline"} onClick={() => setOpen(false)}>
            Tutup
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
