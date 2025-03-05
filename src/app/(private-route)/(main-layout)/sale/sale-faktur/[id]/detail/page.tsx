import { type Metadata } from "next";

import DetailSaleFakturPage from "@/components/sale/saleFaktur/detail/DetailSaleFakturPage";

export const metadata: Metadata = {
  title: "Agrimas - Detail Sale Faktur Page",
  description:
    "Select a company to proceed based on your role. Streamline navigation and access specific company data with ease.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};
const page = ({ params }: { params: { id: string } }) => {
  return <DetailSaleFakturPage id={params.id} />;
};

export default page;
