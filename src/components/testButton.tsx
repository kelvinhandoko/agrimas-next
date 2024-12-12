"use client";

import { useState } from "react";

import { update } from "@/server/services";

import AccountForm from "@/components/account/form/AccountForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function UpdateButton({ newCompany }: { newCompany: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        onClick={async () => {
          await update({ user: { companyId: newCompany } });
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
          <AccountForm onClose={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
}
