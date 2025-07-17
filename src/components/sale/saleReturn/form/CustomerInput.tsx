import { type InvoiceReturnPayload } from "@/model/invoice-return.model";
import { api } from "@/trpc/react";
import React, { type FC, useState } from "react";
import { type UseFormReturn } from "react-hook-form";

import { useDebounce } from "@/hooks/use-debounce";

import { AutoComplete } from "@/components/common/input/AutoComplete";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface CustomerInputProps {
  form: UseFormReturn<InvoiceReturnPayload>;
}

const CustomerInput: FC<CustomerInputProps> = ({ form }) => {
  const [search, setSearch] = useState("");

  const debounceSearch = useDebounce(search, 300);
  const { data, isLoading, fetchNextPage, hasNextPage, isFetching } =
    api.customer.getInfinite.useInfiniteQuery(
      { search: debounceSearch, limit: 5 },
      {
        getNextPageParam: (lastPage) => lastPage.meta.endCursor,
      },
    );
  const customers = data?.pages.flatMap((page) => page.data) ?? [];
  return (
    <>
      <FormField
        control={form.control}
        name="customerId"
        render={({ field }) => (
          <FormItem className="flex flex-col items-start justify-start gap-2">
            <FormLabel>customer</FormLabel>
            <FormControl>
              <AutoComplete
                options={customers}
                hasMore={hasNextPage}
                fetchMore={fetchNextPage}
                labelKey="nama"
                valueKey="id"
                onSelect={(val) => {
                  field.onChange(val);
                }}
                className="w-full"
                isFetching={isFetching}
                onInputChange={(data) => setSearch(data)}
                isLoading={isLoading}
                placeholder="pilih nama customer"
                value={field.value}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default CustomerInput;
