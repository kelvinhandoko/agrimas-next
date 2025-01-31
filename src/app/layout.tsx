import { TRPCReactProvider } from "@/provider/TrpcProvider";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { SessionProvider } from "next-auth/react";

import "@/styles/globals.css";

import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <TRPCReactProvider>
          <SessionProvider>
            <Theme>{children}</Theme>
          </SessionProvider>
        </TRPCReactProvider>
        <Toaster richColors />
      </body>
    </html>
  );
}
