import MainLayout from "@/layouts/main/MainLayout";
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
  if (!session) {
    return redirect(paths.auth.signIn);
  }

  return <MainLayout>{children}</MainLayout>;
}
