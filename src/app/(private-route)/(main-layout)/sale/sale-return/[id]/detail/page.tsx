import { type Metadata } from "next";

import DetailSaleReturnPage from "@/components/sale/saleReturn/detail/DetailSaleReturnPage";

export const metadata: Metadata = {
  title: "Agrimas - Detail Sale Return Page",
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
  return <DetailSaleReturnPage id={id} />;
};

export default page;
