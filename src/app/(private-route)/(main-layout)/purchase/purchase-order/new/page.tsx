import { Metadata } from "next";

import AddNewPurchaseOrderPage from "@/components/purchase/purchaseOrder/new/AddNewPurchaseOrderPage";

export const metadata: Metadata = {
  title: "Agrimas - New Purchase Order Page",
  description:
    "Select a company to proceed based on your role. Streamline navigation and access specific company data with ease.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};
const page = () => {
  return <AddNewPurchaseOrderPage />;
};

export default page;
