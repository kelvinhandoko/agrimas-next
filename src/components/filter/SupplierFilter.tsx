"use client";

import { api } from "@/trpc/react";
import { X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { type FC, useState } from "react";

import { useDebounce } from "@/hooks/use-debounce";
import { useUpdateParams } from "@/hooks/use-update-params";

import { AutoComplete } from "@/components/common/input/AutoComplete";
import { Button } from "@/components/ui/button";

interface SupplierFilterProps {
  name?: string;
}

const SupplierFilter: FC<SupplierFilterProps> = ({ name = "supplierId" }) => {
  const searchParams = useSearchParams();
  const supplierId = searchParams.get(name) ?? "";
  const [input, setInput] = useState("");
  const debounceInput = useDebounce(input, 500);
  const { updateParams, deleteParams } = useUpdateParams();

  const { data, hasNextPage, fetchNextPage, isLoading, isFetching } =
    api.supplier.getInfinite.useInfiniteQuery(
      { search: debounceInput },
      {
        getNextPageParam: (lastPage) =>
          lastPage.meta.hasNextPage ? lastPage.meta.endCursor : undefined,
      },
    );

  const suppliers = data?.pages.flatMap((page) => page.data) ?? [];

  return (
    <div className="flex items-center gap-2">
      <AutoComplete
        options={suppliers}
        hasMore={hasNextPage}
        fetchMore={fetchNextPage}
        className="w-fit min-w-64"
        labelKey="nama"
        valueKey="id"
        onSelect={(val) => {
          updateParams(name, val as string);
        }}
        isFetching={isFetching}
        onInputChange={(data) => setInput(data)}
        isLoading={isLoading}
        placeholder="pilih nama supplier"
        value={supplierId}
      />
      {supplierId && (
        <Button size="icon" onClick={() => deleteParams(name)}>
          <X />
        </Button>
      )}
    </div>
  );
};

export default SupplierFilter;
