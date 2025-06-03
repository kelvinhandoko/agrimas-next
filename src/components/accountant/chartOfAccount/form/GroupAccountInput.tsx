import { type AccountPayload } from "@/model";
import { api } from "@/trpc/react";
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

interface GroupAccountInputProps {
  form: UseFormReturn<AccountPayload>;
}

const GroupAccountInput: FC<GroupAccountInputProps> = ({ form }) => {
  const [search, setSearch] = useState("");
  const debounceSearch = useDebounce(search, 300);
  const { data, isLoading, fetchNextPage, hasNextPage, isFetching } =
    api.groupAccount.getInfinite.useInfiniteQuery(
      { search: debounceSearch, limit: 10 },
      {
        getNextPageParam: (lastPage) => lastPage.meta.endCursor,
      },
    );
  const groupAccounts = data?.pages.flatMap((page) => page.data) ?? [];
  return (
    <>
      <FormField
        control={form.control}
        name="groupAccountId"
        render={({ field }) => (
          <FormItem className="flex flex-col items-start justify-start gap-2">
            <FormLabel>kelompok akun</FormLabel>
            <FormControl>
              <AutoComplete
                options={groupAccounts}
                hasMore={hasNextPage}
                fetchMore={fetchNextPage}
                valueKey="id"
                onSelect={(val) => {
                  field.onChange(val);
                }}
                customLabel={({ code, name }) => (
                  <CardTitle>
                    {code} {name}
                  </CardTitle>
                )}
                isFetching={isFetching}
                onInputChange={(data) => setSearch(data)}
                isLoading={isLoading}
                placeholder="pilih kelompok akun"
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

export default GroupAccountInput;
