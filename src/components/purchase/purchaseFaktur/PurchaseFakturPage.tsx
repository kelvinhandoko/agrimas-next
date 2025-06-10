"use client";

import { paths } from "@/paths/paths";
import { api } from "@/trpc/react";
import { Box } from "@radix-ui/themes";
import { useSearchParams } from "next/navigation";

import BackButton from "@/components/BackButton";
import DataTable from "@/components/common/table/DataTable";

import PurchaseInvoiceColumn from "./Column";

const dummyData = [
  {
    noPurchaseFaktur: "PF-0001",
    noPurchaseOrder: "PO-0002",
    date: "16/12/2024",
    supplier: "supplier 1",
    status: "paid",
  },
  {
    noPurchaseFaktur: "PF-0002",
    noPurchaseOrder: "PO-00010",
    date: "16/12/2024",
    supplier: "supplier 100",
    status: "unpaid",
  },
];

const PurchaseFakturPage = () => {
  const searchparams = useSearchParams();
  const page = Number(searchparams.get("page") ?? 1);
  const limit = Number(searchparams.get("limit") ?? 10);
  const search = searchparams.get("search") ?? "";
  const { data, isLoading } = api.purchaseInvoice.get.useQuery({
    page,
    limit,
    search,
  });

  console.log(data);

  return (
    <Box>
      <Box className="mb-8">
        <BackButton path={paths.purchase.root} />
      </Box>
      <pre>{JSON.stringify(data, undefined, 2)}</pre>
      <DataTable
        columns={PurchaseInvoiceColumn()}
        data={data?.data || []}
        path={paths.purchase.purchaseFaktur.new}
        searchAble
        searchPlaceholder="cari no faktur pembelian"
        buttonAddName="Tambah Faktur Pembelian"
        titleTable="Data Faktur Pembelian"
      />
    </Box>
  );
};

export default PurchaseFakturPage;
