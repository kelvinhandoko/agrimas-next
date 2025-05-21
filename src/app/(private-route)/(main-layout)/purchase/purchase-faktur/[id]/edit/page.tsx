import { Metadata } from "next";

import EditPurchaseFakturPage from "@/components/purchase/purchaseFaktur/edit/EditPurchaseFakturPage";

export const metadata: Metadata = {
  title: "Agrimas - Edit Purchase Faktur Page",
  description:
    "Select a company to proceed based on your role. Streamline navigation and access specific company data with ease.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};
const page = ({ id }: { id: string }) => {
  return <EditPurchaseFakturPage id={id} />;
};

export default page;
