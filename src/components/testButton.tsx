"use client";
import { useSession } from "next-auth/react";

export default function UpdateButton({ newCompany }: { newCompany: String }) {
  const { data: session, update } = useSession();
  return (
    <button
      onClick={() => {
        update({ companyId: newCompany });
      }}
    >
      Client Side Update
    </button>
  );
}
