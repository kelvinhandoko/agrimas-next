import { type SalesInvoicePayload } from "@/model/sales-invoice.model";
import { api } from "@/trpc/react";
import React, { type FC, useState } from "react";
import { type UseFormReturn } from "react-hook-form";

import { useDebounce } from "@/hooks/use-debounce";

import DialogWrapper from "@/components/DialogWrapper";
import { AutoComplete } from "@/components/common/input/AutoComplete";
import CreateCustomerForm from "@/components/dataMaster/dataMasterList/customer/createCustomerForm";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface CustomereInputProps {
  form: UseFormReturn<SalesInvoicePayload>;
}

const CustomereInput: FC<CustomereInputProps> = ({ form }) => {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const debounceSearch = useDebounce(search, 300);
  const { data, isLoading, fetchNextPage, hasNextPage, isFetching } =
    api.customer.getInfinite.useInfiniteQuery(
      { search: debounceSearch, limit: 5 },
      {
        getNextPageParam: (lastPage) => lastPage.meta.endCursor,
      },
    );
  const customer = data?.pages.flatMap((page) => page.data) ?? [];
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
                options={customer}
                hasMore={hasNextPage}
                fetchMore={fetchNextPage}
                labelKey="nama"
                valueKey="id"
                onAddNew={() => setIsOpen(true)}
                onSelect={(val) => {
                  field.onChange(val);
                }}
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
      <DialogWrapper title="Sales form" open={isOpen} onOpenChange={setIsOpen}>
        <CreateCustomerForm
          onClose={(id) => {
            setIsOpen(false);
            form.setValue("customerId", id);
          }}
          data={{ nama: search }}
          type="CREATE"
        />
      </DialogWrapper>
    </>
  );
};

export default CustomereInput;
