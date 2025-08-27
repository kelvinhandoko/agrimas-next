import { api } from "@/trpc/react";
import { formatPrice } from "@/utils/format-price";
import { Text } from "@radix-ui/themes";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function DetailProductModal({
  id,
  name,
  price,
  supplierId,
  open,
  onOpenChange, // ← tambahkan ini
}: {
  id: string;
  name: string;
  price?: number;
  supplierId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void; // ← tambahkan ini
}) {
  const { data: supplierProduct } = api.supplier.getDetail.useQuery({
    id: supplierId,
  });

  const fallbackName = (name: string) =>
    name
      .split(" ")
      .slice(0, 2)
      .map((word) => word[0])
      .join("")
      .toUpperCase();

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-x-3">
            <Avatar className="h-[70px] w-[70px]">
              <AvatarFallback>{fallbackName(name)}</AvatarFallback>
            </Avatar>
            <Text>{name}</Text>
          </AlertDialogTitle>
          <AlertDialogDescription>
            {/* Detail Content */}
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
                {supplierProduct?.alamat?.length
                  ? supplierProduct?.alamat
                  : "-"}
              </Text>
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Tutup
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
