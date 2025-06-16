import { type PurchaseInvoicePayload } from "@/model/purchase-invoice";
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

interface ReceiveItemInputProps {
  form: UseFormReturn<PurchaseInvoicePayload>;
}

const ReceiveItemInput: FC<ReceiveItemInputProps> = ({ form }) => {
  const [search, setSearch] = useState("");
  const debounceSearch = useDebounce(search, 300);
  const { data, isLoading, fetchNextPage, hasNextPage, isFetching } =
    api.receiveItem.getInfinite.useInfiniteQuery(
      { search: debounceSearch, limit: 10 },
      {
        getNextPageParam: (lastPage) => lastPage.meta.endCursor,
      },
    );
  const receiveItems = data?.pages.flatMap((page) => page.data) ?? [];
  return (
    <>
      <FormField
        control={form.control}
        name="receiveItemId"
        render={({ field }) => (
          <FormItem className="flex flex-col items-start justify-start gap-2">
            <FormLabel>surat jalan pembelian</FormLabel>
            <FormControl>
              <AutoComplete
                options={receiveItems}
                hasMore={hasNextPage}
                fetchMore={fetchNextPage}
                valueKey="id"
                onSelect={(val) => {
                  field.onChange(val);
                  const orders = receiveItems.find(
                    ({ id }) => id === (val as string),
                  );
                  if (!orders) {
                    form.setValue("details", []);
                    return;
                  }
                  const details: PurchaseInvoicePayload["details"] =
                    orders.receiveItemDetail.map((detail) => {
                      return {
                        discount: detail.purchaseDetail.discount,
                        price: detail.purchaseDetail.price,
                        productId: detail.productId,
                        quantity: detail.quantity,
                        tax: detail.purchaseDetail.ppn,
                        productName: detail.purchaseDetail.product.name,
                        purchaseDetailId: detail.id,
                        maxQuantity: detail.quantity,
                        totalReceive: detail.purchaseDetail.totalReceive,
                      };
                    });
                  form.setValue("details", details);
                  form.setValue(
                    "discount",
                    orders.receiveItemDetail[0]?.purchaseDetail.purchase
                      .discount ?? 0,
                  );
                  form.setValue(
                    "tax",
                    orders.receiveItemDetail[0]?.purchaseDetail.purchase.ppn ??
                      0,
                  );
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

export default ReceiveItemInput;
