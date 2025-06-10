import { HydrateClient, api } from "@/trpc/server";
import { type Metadata } from "next";
import React from "react";

import EditProductForm from "@/components/dataMaster/dataMasterList/product/EditProductForm";

export const metadata: Metadata = {
  title: "Agrimasi - Edit Product Page",
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
  await api.product.getDetail.prefetch(id);
  return (
    <HydrateClient>
      <EditProductForm productId={id} />
    </HydrateClient>
  );
};

export default page;
