"use client";

import { type SalesPaymentPayload } from "@/model/sales-payment.model";
import { api } from "@/trpc/react";
import { useSearchParams } from "next/navigation";
import React, { type FC, useState } from "react";
import { type UseFormReturn } from "react-hook-form";

import { useDebounce } from "@/hooks/use-debounce";

import { AutoComplete } from "@/components/common/input/AutoComplete";
import { CardTitle } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface SalesInvoiceInputProps {
  form: UseFormReturn<SalesPaymentPayload>;
}

const SalesInvoiceInput: FC<SalesInvoiceInputProps> = ({ form }) => {
  const searchparams = useSearchParams();
  const [search, setSearch] = useState(searchparams.get("invoiceId") ?? "");
  const debounceSearch = useDebounce(search, 300);
  const { data, isLoading, fetchNextPage, hasNextPage, isFetching } =
    api.salesInvoice.getInfinite.useInfiniteQuery(
      {
        search: debounceSearch,
      },
      {
        getNextPageParam: (data) => data.meta.endCursor,
      },
    );
  const salesInvoice = data?.pages.flatMap((page) => page.data) ?? [];

  return (
    <FormField
      control={form.control}
      name="salesInvoiceId"
      render={({ field }) => (
        <FormItem className="flex flex-col items-start justify-start gap-2">
          <FormLabel>faktur penjualan</FormLabel>
          <FormControl>
            <AutoComplete
              options={salesInvoice}
              hasMore={hasNextPage}
              customLabel={({ ref, customer }) => (
                <CardTitle>
                  {ref} ({customer.nama})
                </CardTitle>
              )}
              fetchMore={fetchNextPage}
              valueKey="id"
              onSelect={(val) => {
                field.onChange(val);
              }}
              isFetching={isFetching}
              onInputChange={(data) => setSearch(data)}
              isLoading={isLoading}
              placeholder="pilih faktur penjualan"
              value={field.value}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SalesInvoiceInput;
