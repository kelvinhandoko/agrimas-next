import { type Metadata } from "next";
import React from "react";

import ProfilePage from "@/components/profile/ProfilePage";

export const metadata: Metadata = {
  title: "Agrimas - Profile Page",
  description:
    "Select a company to proceed based on your role. Streamline navigation and access specific company data with ease.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};
const page = () => {
  return <ProfilePage />;
};

export default page;
