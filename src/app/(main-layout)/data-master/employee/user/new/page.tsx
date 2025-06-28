import { type Metadata } from "next";

import AddNewUserPage from "@/components/dataMaster/dataMasterList/employee/user/new/AddNewUserPage";

export const metadata: Metadata = {
  title: "Agrimasi - Add User Page",
  description:
    "Select a company to proceed based on your role. Streamline navigation and access specific company data with ease.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};
const page = () => {
  return <AddNewUserPage />;
};

export default page;
