import { type Metadata } from "next";

import EditUserPage from "@/components/dataMaster/dataMasterList/employee/user/edit/editUserPage";

export const metadata: Metadata = {
  title: "Agrimas - User Edit Page",
  description:
    "Select a company to proceed based on your role. Streamline navigation and access specific company data with ease.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const page = ({ params }: { params: { id: string } }) => {
  return <EditUserPage id={params.id} />;
};

export default page;
