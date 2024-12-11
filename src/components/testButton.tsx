"use client";
import GroupAccountForm from "@/components/groupAccount/Form/GroupAccountForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function UpdateButton({ newCompany }: { newCompany: string }) {
  const { data: session, update } = useSession();
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        onClick={async () => {
          await update({ companyId: newCompany });
        }}
      >
        Client Side Update
      </Button>
      <Button onClick={() => setOpen(true)}>open</Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>form kelompok akun</DialogTitle>
          </DialogHeader>
          <GroupAccountForm onClose={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
}
