import { Metadata } from "next";

import DetailPurchasePayablePage from "@/components/purchase/purchasePayable/detail/DetailPurchasePayablePage";

export const metadata: Metadata = {
  title: "Agrimas - Detail Purchase Payable Page",
  description:
    "Select a company to proceed based on your role. Streamline navigation and access specific company data with ease.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}
const page = async ({ params }: PageProps) => {
  const id = (await params).id;
  return <DetailPurchasePayablePage id={id} />;
};

export default page;
