import { type Metadata } from "next";

import SignInPage from "@/components/auth/SignInPage";

export const metadata: Metadata = {
  title: "Agrimas - Sign In Page",
  description: "Login to your Agrimas account and access all features.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const page = async () => {
  return <SignInPage />;
};

export default page;
