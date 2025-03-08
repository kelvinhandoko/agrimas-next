import { type Metadata } from "next";
import React from "react";

import ForgotPassword from "@/components/auth/ForgotPassword";

export const metadata: Metadata = {
  title: "Agrimas - Forgot Password Page",
  description:
    "Reset your Agrimas account password easily and securely to regain access to all features.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const page = () => {
  return <ForgotPassword />;
};

export default page;
