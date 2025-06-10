import { type Metadata } from "next";
import React from "react";

import ProductPage from "@/components/dataMaster/dataMasterList/product/ProductPage";

export const metadata: Metadata = {
  title: "Agrimas - Product Page",
  description:
    "Select a company to proceed based on your role. Streamline navigation and access specific company data with ease.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};
const page = () => {
  return <ProductPage />;
};

export default page;
