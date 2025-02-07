import { Metadata } from "next";
import React from "react";

import AddNewProductPage from "@/components/dataMaster/dataMasterList/product/new/addNewProduct";

export const metadata: Metadata = {
  title: "Agrimasi - Add Product Page",
  description:
    "Select a company to proceed based on your role. Streamline navigation and access specific company data with ease.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};
const page = () => {
  return <AddNewProductPage />;
};

export default page;
