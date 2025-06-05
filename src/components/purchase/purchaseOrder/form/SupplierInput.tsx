import { type PurchasePayload } from "@/model/purchase.model";
import { api } from "@/trpc/react";
import React, { type FC, useState } from "react";
import { type UseFormReturn } from "react-hook-form";

import { useDebounce } from "@/hooks/use-debounce";

import DialogWrapper from "@/components/DialogWrapper";
import { AutoComplete } from "@/components/common/input/AutoComplete";
import CreateSupplierForm from "@/components/dataMaster/dataMasterList/supplier/CreateSupplierForm";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface SupplierInput {
  form: UseFormReturn<PurchasePayload>;
}

const SupplierInput: FC<SupplierInput> = ({ form }) => {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const debounceSearch = useDebounce(search, 300);
  const { data, isLoading, fetchNextPage, hasNextPage, isFetching } =
    api.supplier.getInfinite.useInfiniteQuery(
      { search: debounceSearch, limit: 5 },
      {
        getNextPageParam: (lastPage) => lastPage.meta.endCursor,
      },
    );
  const suppliers = data?.pages.flatMap((page) => page.data) ?? [];
  return (
    <>
      <FormField
        control={form.control}
        name="supplierId"
        render={({ field }) => (
          <FormItem className="flex flex-col items-start justify-start gap-2">
            <FormLabel>supplier</FormLabel>
            <FormControl>
              <AutoComplete
                options={suppliers}
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
                placeholder="pilih nama supplier"
                value={field.value}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <DialogWrapper
        title="Supplier form"
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <CreateSupplierForm
          onClose={(id) => {
            setIsOpen(false);
            form.setValue("supplierId", id);
          }}
          data={{ nama: search }}
          type="CREATE"
        />
      </DialogWrapper>
    </>
  );
};

export default SupplierInput;
