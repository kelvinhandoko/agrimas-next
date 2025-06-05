import { Metadata } from "next";

import DetailPurcaseReceived from "@/components/purchase/purchaseReceived/detail/DetailPurchaseReceived";

export const metadata: Metadata = {
  title: "Agrimas - Detail Purchase Received Page",
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
  return <DetailPurcaseReceived id={id} />;
};

export default page;
