import { type Metadata } from "next";

import DetailPurchaseFakturPage from "@/components/purchase/purchaseFaktur/detail/DetailPurchaseFakturPage";

export const metadata: Metadata = {
  title: "Agrimas - Detail Purchase Faktur Page",
  description:
    "Select a company to proceed based on your role. Streamline navigation and access specific company data with ease.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

// interface PageProps {
//   params: Promise<{
//     id: string;
//   }>;
// }
const page = async () => {
  return <DetailPurchaseFakturPage />;
};

export default page;
