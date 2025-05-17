import { TRPCReactProvider } from "@/provider/TrpcProvider";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { type Metadata } from "next";
import NextTopLoader from "nextjs-toploader";

import { jakartaSans } from "@/styles/font";
import "@/styles/globals.css";

import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "AGRIMAS",
  description: "AGRIMAS WEB APP",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${jakartaSans.className}`}>
      <body>
        <TRPCReactProvider>
          <Theme>
            <NextTopLoader color="#624DE3" showSpinner={false} height={6} />
            {children}
          </Theme>
        </TRPCReactProvider>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
