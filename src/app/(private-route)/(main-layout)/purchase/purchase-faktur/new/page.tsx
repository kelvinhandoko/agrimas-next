import { type Metadata } from "next";

import PurchaseInvoiceForm from "@/components/purchase/purchaseFaktur/form";

export const metadata: Metadata = {
  title: "Agrimas - New Purchase Faktur Page",
  description:
    "Select a company to proceed based on your role. Streamline navigation and access specific company data with ease.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};
const page = () => {
  return <PurchaseInvoiceForm />;
};

export default page;
