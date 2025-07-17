import { fallbackName } from "@/utils/fallback-name";
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

export default function DetailUserModal({
  id,
  name,
  role,
  open,
  onOpenChange,
}: {
  id: string;
  name: string;
  role: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
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
            <span className="mt-4 block">
              <Text>Role</Text>
              <Text className="block text-base text-black">{role}</Text>
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
