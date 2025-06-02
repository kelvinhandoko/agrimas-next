import { type Metadata } from "next";
import React from "react";

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
  return <div>Edit Product page {id}</div>;
};

export default page;
