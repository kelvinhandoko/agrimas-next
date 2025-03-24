"use client";

import { paths } from "@/paths/paths";
import { api } from "@/trpc/react";
import { Box } from "@radix-ui/themes";

import BackButton from "@/components/BackButton";
import LoadingIndicator from "@/components/LoadingIndicator";
import DataTable from "@/components/common/table/DataTable";

import { PurchaseReceived, purchaseReceivedColumn } from "./Column";

const purchaseReceivedData: PurchaseReceived[] = [
  {
    noPurchaseReceived: "PR-20250301-001",
    noPurchaseOrder: "PO-20250301-001",
    date: "2025-03-01",
    supplier: "PT. Maju Jaya",
    totalItem: 10,
    totalPrice: 5000000,
  },
  {
    noPurchaseReceived: "PR-20250305-002",
    noPurchaseOrder: "PO-20250305-002",
    date: "2025-03-05",
    supplier: "CV. Sumber Rezeki",
    totalItem: 15,
    totalPrice: 7500000,
  },
  {
    noPurchaseReceived: "PR-20250310-003",
    noPurchaseOrder: "PO-20250310-003",
    date: "2025-03-10",
    supplier: "UD. Berkah Makmur",
    totalItem: 8,
    totalPrice: 3200000,
  },
  {
    noPurchaseReceived: "PR-20250315-004",
    noPurchaseOrder: "PO-20250315-004",
    date: "2025-03-15",
    supplier: "PT. Indo Supplies",
    totalItem: 20,
    totalPrice: 10000000,
  },
  {
    noPurchaseReceived: "PR-20250320-005",
    noPurchaseOrder: "PO-20250320-005",
    date: "2025-03-20",
    supplier: "CV. Makmur Sentosa",
    totalItem: 12,
    totalPrice: 6000000,
  },
];
const PurchaseReceivedPage = () => {
  // const { data, isLoading } = api.supplier.getAll.useQuery({});
  // if (isLoading) {
  //   return <LoadingIndicator />;
  // }
  return (
    <Box>
      <Box className="mb-8">
        <BackButton path={paths.purchase.root} />
      </Box>
      <DataTable
        columns={purchaseReceivedColumn()}
        data={purchaseReceivedData || []}
        path={paths.purchase.purchaseReceived.new}
        searchAble
        searchPlaceholder="cari no penerimaan pembelian"
        buttonAddName="Tambah Penerimaan Pembelian"
        titleTable="Data Penerimaan Pembelian"
      />
    </Box>
  );
};

export default PurchaseReceivedPage;
