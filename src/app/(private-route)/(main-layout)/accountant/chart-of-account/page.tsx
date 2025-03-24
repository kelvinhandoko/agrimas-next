import { type Metadata } from "next";

import AccountantPage from "@/components/accountant/AccountantPage";

export const metadata: Metadata = {
  title: "Agrimas - Chart of Account Page",
  description:
    "Select a company to proceed based on your role. Streamline navigation and access specific company data with ease.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};
const page = () => {
  return <AccountantPage />;
};

export default page;
