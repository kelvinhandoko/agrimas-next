"use client";

import { LIMIT } from "@/constant";
import { api } from "@/trpc/react";
import { convertAccountClass } from "@/utils/accountClassHelper";
import { type AccountClass } from "@prisma/client";
import { groupBy } from "lodash";
import { CheckIcon, ChevronDownIcon } from "lucide-react";
import { type FC, useEffect, useState } from "react";
import { type UseFormReturn } from "react-hook-form";
import { useInView } from "react-intersection-observer";

import { cn } from "@/lib/utils";

import { useDebounce } from "@/hooks/use-debounce";

import { type AccountPayload } from "@/server/account";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface GroupAccountInputProps {
  form: UseFormReturn<AccountPayload>;
}

const GroupAccountInput: FC<GroupAccountInputProps> = ({ form }) => {
  // hooks
  /**
   * State untuk menyimpan query search kelompok akun.
   * Digunakan untuk memfilter atau mencari melalui daftar kelompok akun.
   */
  const [search, setSearch] = useState("");

  /**
   * State untuk melacak apakah pencarian sedang aktif.
   * Menunjukkan jika pengguna sedang melakukan pencarian.
   */
  const [isActive, setIsActive] = useState(false);

  /**
   * State untuk mengatur visibilitas modal form.
   * Menentukan apakah modal form sedang terbuka atau tertutup.
   */
  const [isFormOpen, setIsFormOpen] = useState(false);

  const debounceSearch = useDebounce(search, 200);

  const { ref, inView } = useInView();

  //apis
  const {
    data: groupAccountData,
    hasNextPage,
    fetchNextPage,
    isLoading,
    isFetchingNextPage,
  } = api.groupAccount.getAll.useInfiniteQuery(
    {
      infiniteScroll: true,
      limit: LIMIT,
      search: debounceSearch,
    },
    { getNextPageParam: (lastPage) => lastPage.nextCursor },
  );
  const groupAccounts =
    groupAccountData?.pages.flatMap((page) => page.data) ?? [];
  const groupedGroupAccounts = groupBy(
    groupAccounts,
    ({ accountClass }) => accountClass,
  );
  useEffect(() => {
    if (inView && hasNextPage) {
      void fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, inView]);

  return (
    <FormField
      control={form.control}
      name={"groupAccountId"}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>kelompok akun</FormLabel>
          <Popover open={isActive} onOpenChange={setIsActive}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "justify-between bg-transparent",
                    !field.value && "text-muted-foreground",
                  )}
                >
                  {field.value
                    ? groupAccounts.find(
                        (groupAccount) => groupAccount.id === field.value,
                      )?.name
                    : "pilih kelompok akun"}
                  <ChevronDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="p-0">
              <Command shouldFilter={false}>
                <CommandInput
                  value={search}
                  onValueChange={setSearch}
                  placeholder="cari kelompok akun..."
                />
                <CommandList>
                  <CommandEmpty className="p-4">
                    <Button
                      onClick={() => setIsFormOpen(true)}
                      className="w-full"
                      variant="outline"
                    >
                      tambah kategori : {search}
                    </Button>
                  </CommandEmpty>
                  {Object.entries(groupedGroupAccounts).map(
                    ([accountClass, data]) => (
                      <CommandGroup
                        key={accountClass}
                        heading={convertAccountClass(
                          accountClass as AccountClass,
                        )}
                      >
                        {data.map((groupAccount) => (
                          <CommandItem
                            value={groupAccount.name}
                            key={groupAccount.id}
                            onSelect={() => {
                              field.onChange(groupAccount.id);
                              setIsActive(false);
                            }}
                          >
                            <CheckIcon
                              className={cn(
                                "mr-2 h-4 w-4",
                                groupAccount.id === field.value
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                            {groupAccount.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    ),
                  )}
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default GroupAccountInput;
