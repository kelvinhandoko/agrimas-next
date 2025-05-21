import { Metadata } from "next";

import DetailPurchaseFakturPage from "@/components/purchase/purchaseFaktur/detail/DetailPurchaseFakturPage";

export const metadata: Metadata = {
  title: "Agrimas - Detail Purchase Faktur Page",
  description:
    "Select a company to proceed based on your role. Streamline navigation and access specific company data with ease.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};
const page = ({ id }: { id: string }) => {
  return <DetailPurchaseFakturPage id={id} />;
};

export default page;
