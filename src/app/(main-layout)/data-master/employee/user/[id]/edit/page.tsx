import { type Metadata } from "next";

import EditUserPage from "@/components/dataMaster/dataMasterList/employee/user/edit/editUserPage";

export const metadata: Metadata = {
  title: "Agrimas - User Edit Page",
  description:
    "Select a company to proceed based on your role. Streamline navigation and access specific company data with ease.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

const page = async ({ params }: PageProps) => {
  const id = (await params).id;
  return <EditUserPage id={id} />;
};

export default page;
