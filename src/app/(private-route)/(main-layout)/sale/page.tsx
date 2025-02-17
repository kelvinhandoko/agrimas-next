import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Agrimas - Sale Page",
  description:
    "Select a company to proceed based on your role. Streamline navigation and access specific company data with ease.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};
const page = () => {
  return <div>Sale page</div>;
};

export default page;
