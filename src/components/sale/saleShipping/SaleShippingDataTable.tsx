"use client";

import { paths } from "@/paths/paths";
import { api } from "@/trpc/react";
import { toast } from "sonner";

import LoadingIndicator from "@/components/LoadingIndicator";
import DataTable from "@/components/common/table/DataTable";

import { SaleShipping, SaleShippingColumn } from "./Column";

const saleShippingData: SaleShipping[] = [
  {
    noSaleShipping: "SS-20250301-001",
    noPurchaseOrder: "SO-20250301-001",
    date: "2025-03-01",
    customer: "PT. Maju Jaya",
    totalItem: 10,
    totalPrice: 5000000,
  },
  {
    noSaleShipping: "SS-20250305-002",
    noPurchaseOrder: "SO-20250305-002",
    date: "2025-03-05",
    customer: "CV. Sumber Rezeki",
    totalItem: 15,
    totalPrice: 7500000,
  },
  {
    noSaleShipping: "SS-20250310-003",
    noPurchaseOrder: "SO-20250310-003",
    date: "2025-03-10",
    customer: "UD. Berkah Makmur",
    totalItem: 8,
    totalPrice: 3200000,
  },
  {
    noSaleShipping: "SS-20250315-004",
    noPurchaseOrder: "SO-20250315-004",
    date: "2025-03-15",
    customer: "PT. Indo Supplies",
    totalItem: 20,
    totalPrice: 10000000,
  },
  {
    noSaleShipping: "SS-20250320-005",
    noPurchaseOrder: "SO-20250320-005",
    date: "2025-03-20",
    customer: "CV. Makmur Sentosa",
    totalItem: 12,
    totalPrice: 6000000,
  },
];
const SaleShippingDataTable = () => {
  // const utils = api.useUtils();
  // const { data, isLoading } = api.user.getAll.useQuery({});

  // const { mutateAsync: deleteUser } = api.user.delete.useMutation({
  //   onSuccess: async () => {
  //     toast.success("Berhasil hapus pesanan penjualan");
  //     await utils.user.getAll.invalidate();
  //   },
  //   onError: () => {
  //     toast.error("Gagal menghapus pesanan penjualan");
  //   },
  // });

  // const handleDeleteUser = async (id: string) => {
  //   try {
  //     await deleteUser(id);
  //   } catch (error) {
  //     console.error("Error deleting pesanan penjualan:", error);
  //   }
  // };
  // if (isLoading) {
  //   return <LoadingIndicator />;
  // }
  return (
    <DataTable
      columns={SaleShippingColumn()}
      data={saleShippingData || []}
      searchAble
      path={paths.sale.saleShipping.new}
      titleTable="Data Pengiriman Barang"
      buttonAddName="Tambah Pengiriman Barang"
    />
  );
};

export default SaleShippingDataTable;
