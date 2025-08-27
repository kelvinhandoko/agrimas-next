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

export default function DetailSalesModal({
  name,
  open,
  onOpenChange,
}: {
  name: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
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
            <span>
              <Text>Name</Text>
              <Text className="block text-base text-black">{name}</Text>
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button variant={"outline"} onClick={() => onOpenChange(false)}>
            Tutup
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
