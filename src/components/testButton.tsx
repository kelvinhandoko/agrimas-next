"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

export default function UpdateButton() {
  const [open, setOpen] = useState(false);
  const { update, data } = useSession();
  return (
    <>
      <Button
        onClick={async () => {
          await update({ companyId: "1" });
        }}
      >
        update company (klik ini dulu)
        {data?.user.companyId}
      </Button>
    </>
  );
}
