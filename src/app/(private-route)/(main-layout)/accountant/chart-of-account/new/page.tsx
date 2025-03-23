import { Metadata } from "next";

import NewAccountantPage from "@/components/accountant/new/NewAccountantPage";

export const metadata: Metadata = {
  title: "Agrimas - New Account Page",
  description:
    "Select a company to proceed based on your role. Streamline navigation and access specific company data with ease.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};
const page = () => {
  return <NewAccountantPage />;
};

export default page;
