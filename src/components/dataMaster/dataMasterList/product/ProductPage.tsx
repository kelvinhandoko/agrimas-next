"use client";

import { paths } from "@/paths/paths";
import { api } from "@/trpc/react";
import { Box } from "@radix-ui/themes";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

import BackButton from "@/components/BackButton";
import DataTable from "@/components/common/table/DataTable";

import { productColumn } from "./Column";

const ProductPage = () => {
  const utils = api.useUtils();
  const searchparams = useSearchParams();
  const search = searchparams.get("search") ?? "";
  const { data, isLoading } = api.product.getAll.useQuery({ search });

  const { mutateAsync: deleteSales } = api.user.delete.useMutation({
    onSuccess: async () => {
      toast.success("Berhasil hapus product");
      await utils.user.getAll.invalidate();
    },
    onError: () => {
      toast.error("Gagal menghapus sales");
    },
  });

  const handleDeleteProduct = async (id: string) => {
    try {
      await deleteSales(id);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <Box>
      <Box className="mb-8">
        <BackButton path={paths.dataMaster.root} />
      </Box>
      <DataTable
        columns={productColumn({ handleDeleteProduct })}
        data={data?.data ?? []}
        searchAble
        totalData={data?.meta.totalCount}
        isLoading={isLoading}
        totalPage={data?.meta.pageCount}
        path={paths.dataMaster.product.new}
        buttonAddName="Tambah Product"
        titleTable="Data Product"
      />
    </Box>
  );
};

export default ProductPage;
