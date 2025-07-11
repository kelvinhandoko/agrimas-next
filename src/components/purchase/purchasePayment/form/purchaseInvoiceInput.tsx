"use client";

import { api } from "@/trpc/react";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";

import { useDebounce } from "@/hooks/use-debounce";
import { useUpdateParams } from "@/hooks/use-update-params";

import { AutoComplete } from "@/components/common/input/AutoComplete";
import { CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

const PurchaseInvoiceInput = () => {
  const searchparams = useSearchParams();
  const invoiceId = searchparams.get("purchaseInvoiceId") ?? "";
  const [search, setSearch] = useState(invoiceId);
  const debounceSearch = useDebounce(search, 300);
  const { updateParams } = useUpdateParams();
  const { data, isLoading, fetchNextPage, hasNextPage, isFetching } =
    api.purchaseInvoice.getInfinite.useInfiniteQuery(
      {
        search: debounceSearch,
      },
      {
        getNextPageParam: (data) => data.meta.endCursor,
      },
    );
  const salesInvoice = data?.pages.flatMap((page) => page.data) ?? [];

  return (
    <div className="flex items-center gap-2">
      <Label>faktur pembelian :</Label>
      <AutoComplete
        options={salesInvoice}
        hasMore={hasNextPage}
        customLabel={({ ref, supplier }) => (
          <CardTitle>
            {ref} ({supplier.nama})
          </CardTitle>
        )}
        fetchMore={fetchNextPage}
        valueKey="id"
        onSelect={(val) => {
          updateParams("purchaseInvoiceId", val as string);
        }}
        isFetching={isFetching}
        onInputChange={(data) => setSearch(data)}
        isLoading={isLoading}
        placeholder="pilih faktur pembelian"
        value={invoiceId}
      />
    </div>
  );
};

export default PurchaseInvoiceInput;
