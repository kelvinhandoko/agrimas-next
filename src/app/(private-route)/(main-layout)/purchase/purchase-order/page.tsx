import { Metadata } from "next";

import PurchaseOrderPage from "@/components/purchase/purchaseOrder/PurchaseOrderPage";

export const metadata: Metadata = {
  title: "Agrimas - Purchase Order Page",
  description:
    "Select a company to proceed based on your role. Streamline navigation and access specific company data with ease.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};
const page = () => {
  return <PurchaseOrderPage />;
};

export default page;
