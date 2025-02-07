import { paths } from "@/paths/paths";
import { Metadata } from "next";
import { redirect } from "next/navigation";

import { auth } from "@/server/services";

export const metadata: Metadata = {
  title: "Agrimas - Redirect Agrimas App",
  description: "Redirect page by role",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function page() {
  const session = await auth();
  if (session?.user.role === "OWNER") {
    redirect(paths.company.chooseCompany);
  } else {
    redirect(paths.Root);
  }
  return <div></div>;
}
