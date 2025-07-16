import { type Metadata } from "next";

import PurchaseReturnForm from "@/components/purchase/purchaseReturn/form";

export const metadata: Metadata = {
  title: "Agrimas - New Purchase Return Page",
  description:
    "Select a company to proceed based on your role. Streamline navigation and access specific company data with ease.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};
const page = () => {
  return <PurchaseReturnForm />;
};

export default page;
