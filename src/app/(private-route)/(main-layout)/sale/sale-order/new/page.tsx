import { type Metadata } from "next";

import AddNewSaleOrderPage from "@/components/sale/saleOrder/new/AddNewSaleOrderPage";

export const metadata: Metadata = {
  title: "Agrimas - New Sale Order Page",
  description:
    "Select a company to proceed based on your role. Streamline navigation and access specific company data with ease.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};
const page = () => {
  return <AddNewSaleOrderPage />;
};

export default page;
