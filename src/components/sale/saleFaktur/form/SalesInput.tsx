import { type SalesInvoicePayload } from "@/model/sales-invoice.model";
import { api } from "@/trpc/react";
import React, { type FC, useState } from "react";
import { type UseFormReturn } from "react-hook-form";

import { useDebounce } from "@/hooks/use-debounce";

import DialogWrapper from "@/components/DialogWrapper";
import { AutoComplete } from "@/components/common/input/AutoComplete";
import SalesPersonForm from "@/components/dataMaster/dataMasterList/employee/sales/SalesPersonForm";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface SalesInputProps {
  form: UseFormReturn<SalesInvoicePayload>;
}

const SalesInput: FC<SalesInputProps> = ({ form }) => {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const debounceSearch = useDebounce(search, 300);
  const { data, isLoading, fetchNextPage, hasNextPage, isFetching } =
    api.salesPerson.getInfinite.useInfiniteQuery(
      { search: debounceSearch, limit: 5 },
      {
        getNextPageParam: (lastPage) => lastPage.meta.endCursor,
      },
    );
  const sales = data?.pages.flatMap((page) => page.data) ?? [];
  return (
    <>
      <FormField
        control={form.control}
        name="salesPersonId"
        render={({ field }) => (
          <FormItem className="flex flex-col items-start justify-start gap-2">
            <FormLabel>sales</FormLabel>
            <FormControl>
              <AutoComplete
                options={sales}
                hasMore={hasNextPage}
                fetchMore={fetchNextPage}
                labelKey="name"
                valueKey="id"
                onAddNew={() => setIsOpen(true)}
                onSelect={(val) => {
                  field.onChange(val);
                }}
                isFetching={isFetching}
                onInputChange={(data) => setSearch(data)}
                isLoading={isLoading}
                placeholder="pilih nama sales"
                value={field.value}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <DialogWrapper title="Sales form" open={isOpen} onOpenChange={setIsOpen}>
        <SalesPersonForm
          onClose={(id) => {
            setIsOpen(false);
            form.setValue("salesPersonId", id);
          }}
          data={{ name: search }}
          type="CREATE"
        />
      </DialogWrapper>
    </>
  );
};

export default SalesInput;
