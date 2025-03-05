import { type Metadata } from "next";

import SaleShippingPage from "@/components/sale/saleShipping/SaleShippingPage";

export const metadata: Metadata = {
  title: "Agrimas - Sale Shipping Page",
  description:
    "Select a company to proceed based on your role. Streamline navigation and access specific company data with ease.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};
const page = () => {
  return <SaleShippingPage />;
};

export default page;
