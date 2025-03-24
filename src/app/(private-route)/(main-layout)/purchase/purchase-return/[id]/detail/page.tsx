import { Metadata } from "next";

import DetailPurcaseReturnPage from "@/components/purchase/purchaseReturn/detail/DetailPurcaseReturnPage";

export const metadata: Metadata = {
  title: "Agrimas - Detail Purchase Return Page",
  description:
    "Select a company to proceed based on your role. Streamline navigation and access specific company data with ease.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const page = ({ params }: { params: { id: string } }) => {
  return <DetailPurcaseReturnPage id={params.id} />;
};

export default page;
