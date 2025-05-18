import { HydrateClient, api } from "@/trpc/server";
import { type Metadata } from "next";

import DetailSaleFakturPage from "@/components/sale/saleFaktur/detail/DetailSaleFakturPage";

export const metadata: Metadata = {
  title: "Agrimas - Detail Sale Faktur Page",
  description:
    "Select a company to proceed based on your role. Streamline navigation and access specific company data with ease.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};
interface PageProps {
  params: Promise<{ id: string }>;
}

const page = async ({ params }: PageProps) => {
  const id = (await params).id;
  await api.salesInvoice.getDetail.prefetch(id);
  return (
    <HydrateClient>
      <DetailSaleFakturPage id={id} />
    </HydrateClient>
  );
};

export default page;
