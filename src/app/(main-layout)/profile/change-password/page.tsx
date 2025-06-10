import { type Metadata } from "next";
import React from "react";

import ChangePasswordPage from "@/components/profile/changePassword/ChangePasswordPage";

export const metadata: Metadata = {
  title: "Agrimas - Change Password Page",
  description:
    "Select a company to proceed based on your role. Streamline navigation and access specific company data with ease.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};
const page = () => {
  return <ChangePasswordPage />;
};

export default page;
