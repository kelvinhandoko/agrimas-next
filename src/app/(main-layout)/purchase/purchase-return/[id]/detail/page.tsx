import { type Metadata } from "next";

import DetailPurcaseReturnPage from "@/components/purchase/purchaseReturn/detail/DetailPurcaseReturnPage";

export const metadata: Metadata = {
  title: "Agrimas - Detail Purchase Return Page",
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
  return <DetailPurcaseReturnPage id={id} />;
};

export default page;
