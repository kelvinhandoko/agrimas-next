import { HydrateClient, api } from "@/trpc/server";

import { SalesInvoiceTable } from "@/components/sale/saleFaktur/table";

interface PageProps {
  searchParams: Promise<Record<string, string | undefined>>;
}

const page = async ({ searchParams }: PageProps) => {
  const params = await searchParams;
  const limit = 10;
  const page = 1;
  const search = "";
  await api.salesInvoice.get.prefetch({ limit, page, search });
  return (
    <HydrateClient>
      <SalesInvoiceTable searchparams={params} />
    </HydrateClient>
  );
};

export default page;
