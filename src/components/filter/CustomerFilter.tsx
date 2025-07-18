"use client";

import { api } from "@/trpc/react";
import { X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { type FC, useState } from "react";

import { useDebounce } from "@/hooks/use-debounce";
import { useUpdateParams } from "@/hooks/use-update-params";

import { AutoComplete } from "@/components/common/input/AutoComplete";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface CustomerFilterProps {
  name?: string;
}

const CustomerFilter: FC<CustomerFilterProps> = ({ name = "customerId" }) => {
  const searchParams = useSearchParams();
  const customerId = searchParams.get(name) ?? "";
  const [input, setInput] = useState("");
  const debounceInput = useDebounce(input, 500);
  const { updateParams, deleteParams } = useUpdateParams();

  const { data, hasNextPage, fetchNextPage, isLoading, isFetching } =
    api.customer.getInfinite.useInfiniteQuery(
      { search: debounceInput },
      {
        getNextPageParam: (lastPage) =>
          lastPage.meta.hasNextPage ? lastPage.meta.endCursor : undefined,
      },
    );

  const customers = data?.pages.flatMap((page) => page.data) ?? [];

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="customerId" className="capitalize">
        Pilih Customer
      </Label>
      <AutoComplete
        options={customers}
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
        placeholder="kosongkan untuk semua customer"
        value={customerId}
      />
      {customerId && (
        <Button size="icon" onClick={() => deleteParams(name)}>
          <X />
        </Button>
      )}
    </div>
  );
};

export default CustomerFilter;
