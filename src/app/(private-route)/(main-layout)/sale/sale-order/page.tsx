import { type Metadata } from "next";

import SaleOrderPage from "@/components/sale/saleOrder/SaleOrderPage";

export const metadata: Metadata = {
  title: "Agrimas - Sale Order Page",
  description:
    "Select a company to proceed based on your role. Streamline navigation and access specific company data with ease.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};
const page = () => {
  return <SaleOrderPage />;
};

export default page;
