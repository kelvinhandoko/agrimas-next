import { Metadata } from "next";

import AddNewPurchasePaymentPage from "@/components/purchase/purchasePayment/new/AddNewPurchasePaymentPage";

export const metadata: Metadata = {
  title: "Agrimas - New Purchase Payment Page",
  description:
    "Select a company to proceed based on your role. Streamline navigation and access specific company data with ease.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};
const page = () => {
  return <AddNewPurchasePaymentPage />;
};

export default page;
