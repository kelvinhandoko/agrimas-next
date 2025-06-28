import { type SalesInvoicePayload } from "@/model/sales-invoice.model";
import { api } from "@/trpc/react";
import React, { type FC, useState } from "react";
import { type UseFormReturn } from "react-hook-form";

import { useDebounce } from "@/hooks/use-debounce";

import { AutoComplete } from "@/components/common/input/AutoComplete";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

interface ProductInputProps {
  form: UseFormReturn<SalesInvoicePayload>;
  index: number;
}

const ProductInput: FC<ProductInputProps> = ({ form, index }) => {
  const [search, setSearch] = useState("");
  const debounceSearch = useDebounce(search, 300);
  const { data, isLoading, fetchNextPage, hasNextPage, isFetching } =
    api.product.getInfinite.useInfiniteQuery(
      { search: debounceSearch, limit: 10, needQuantity: true },
      {
        getNextPageParam: (lastPage) => lastPage.meta.endCursor,
      },
    );
  const products = data?.pages.flatMap((page) => page.data) ?? [];
  return (
    <>
      <FormField
        control={form.control}
        name={`details.${index}.productId`}
        render={({ field }) => (
          <FormItem className="flex flex-col items-start justify-start gap-2">
            <FormControl>
              <AutoComplete
                className="w-full"
                options={products}
                hasMore={hasNextPage}
                fetchMore={fetchNextPage}
                customLabel={({ name, currentQuantity }) => (
                  <p>
                    {name} (sisa : {currentQuantity})
                  </p>
                )}
                valueKey="id"
                onSelect={(val) => {
                  field.onChange(val);
                  const findProduct = products.find(
                    ({ id }) => id === (val as string),
                  );
                  form.setValue(
                    `details.${index}.price`,
                    findProduct?.sellingPrice ?? 0,
                  );
                }}
                isFetching={isFetching}
                onInputChange={(data) => setSearch(data)}
                isLoading={isLoading}
                placeholder="pilih produk"
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

export default ProductInput;
