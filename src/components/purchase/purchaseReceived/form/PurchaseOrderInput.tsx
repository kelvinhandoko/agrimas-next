import { type ReceiveItemPayload } from "@/model/recieve-item.model";
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

interface PurchaseOrderInput {
  form: UseFormReturn<ReceiveItemPayload>;
}

const PurchaseOrderInput: FC<PurchaseOrderInput> = ({ form }) => {
  const [search, setSearch] = useState("");
  const debounceSearch = useDebounce(search, 300);
  const { data, isLoading, fetchNextPage, hasNextPage, isFetching } =
    api.purchase.getInfinite.useInfiniteQuery(
      { search: debounceSearch, limit: 10 },
      {
        getNextPageParam: (lastPage) => lastPage.meta.endCursor,
      },
    );
  const purchaseOrders = data?.pages.flatMap((page) => page.data) ?? [];
  return (
    <>
      <FormField
        control={form.control}
        name="purchaseId"
        render={({ field }) => (
          <FormItem className="flex flex-col items-start justify-start gap-2">
            <FormLabel>permintaan pembelian</FormLabel>
            <FormControl>
              <AutoComplete
                options={purchaseOrders}
                hasMore={hasNextPage}
                fetchMore={fetchNextPage}
                valueKey="id"
                onSelect={(val) => {
                  field.onChange(val);
                  const orders = purchaseOrders.find(
                    ({ id }) => id === (val as string),
                  );
                  if (!orders) {
                    form.setValue("details", []);
                    return;
                  }
                  const details: ReceiveItemPayload["details"] =
                    orders.purchaseDetail.map((detail) => {
                      return {
                        discount: detail.discount,
                        price: detail.price,
                        productId: detail.productId,
                        quantity: detail.quantity - detail.totalReceive,
                        tax: detail.ppn,
                        productName: detail.product.name,
                        purchaseDetailId: detail.id,
                        maxQuantity: detail.quantity,
                        totalReceive: detail.totalReceive,
                      };
                    });
                  form.setValue("details", details);
                }}
                customLabel={({ ref }) => <div>{ref}</div>}
                isFetching={isFetching}
                onInputChange={(data) => setSearch(data)}
                isLoading={isLoading}
                placeholder="pilih permintaan pembelian"
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

export default PurchaseOrderInput;
