import { LIMIT } from "@/constant";
import { HydrateClient, api } from "@/trpc/server";
import { type Metadata } from "next";

import PurchasePaymentFormPage from "@/components/purchase/purchasePayment/form";

export const metadata: Metadata = {
  title: "Agrimas - New Purchase Payment Page",
  description:
    "Select a company to proceed based on your role. Streamline navigation and access specific company data with ease.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const page = async () => {
  await api.purchaseInvoice.getInfinite.prefetchInfinite({
    limit: LIMIT,
  });
  return (
    <HydrateClient>
      <PurchasePaymentFormPage />
    </HydrateClient>
  );
};

export default page;
