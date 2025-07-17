import { HydrateClient } from "@/trpc/server";
import { type Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Agrimas - Payment Method Page",
  description:
    "Select a company to proceed based on your role. Streamline navigation and access specific company data with ease.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};
const page = () => {
  return <HydrateClient>this is payment method page</HydrateClient>;
};

export default page;
