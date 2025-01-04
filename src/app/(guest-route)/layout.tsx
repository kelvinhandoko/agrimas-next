import { paths } from "@/paths/paths";
import { redirect } from "next/navigation";
import React from "react";

import { auth } from "@/server/services";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  console.log("Session guest route:", session);
  if (session) {
    return redirect(paths.Root);
  }

  return <div>{children}</div>;
}
