"use client";

import { LIMIT } from "@/constant";
import { type JournalPayload } from "@/model";
import { api } from "@/trpc/react";
import { groupBy } from "lodash";
import { CheckIcon, ChevronDownIcon } from "lucide-react";
import { type FC, useEffect, useState } from "react";
import { type Control } from "react-hook-form";
import { useInView } from "react-intersection-observer";

import { cn } from "@/lib/utils";

import { useDebounce } from "@/hooks/use-debounce";

import AccountForm from "@/components/account/form/AccountForm";
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface AccountInputProps {
  index: number;
  control: Control<JournalPayload>;
}

const AccountInput: FC<AccountInputProps> = ({ control, index }) => {
  // hooks
  const [isActive, setIsActive] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [search, setSearch] = useState("");

  const debounceSearch = useDebounce(search, 200);

  const { ref, inView } = useInView();

  //apis
  const {
    data: accountData,
    hasNextPage,
    fetchNextPage,
    isLoading,
    isFetchingNextPage,
  } = api.account.getAll.useInfiniteQuery(
    {
      infiniteScroll: true,
      limit: LIMIT,
      search: debounceSearch,
    },
    { getNextPageParam: (lastPage) => lastPage.meta.endCursor },
  );
  const accounts = accountData?.pages.flatMap((page) => page.data) ?? [];

  const groupedAccount = groupBy(
    accounts,
    ({ groupAccount }) => groupAccount.name,
  );

  useEffect(() => {
    if (inView && hasNextPage) {
      void fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, inView]);
  return (
    <>
      <FormField
        control={control}
        name={`details.${index}.accountId`}
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <Popover open={isActive} onOpenChange={setIsActive}>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    autoFocus
                    variant="outline"
                    role="combobox"
                    className={cn(
                      "justify-between bg-transparent",
                      !field.value && "text-muted-foreground",
                    )}
                  >
                    {field.value
                      ? accounts.find((account) => account.id === field.value)
                          ?.name
                      : "pilih nama akun"}
                    <ChevronDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="p-0">
                <Command shouldFilter={false}>
                  <CommandInput
                    value={search}
                    onValueChange={setSearch}
                    placeholder="cari nama akun..."
                  />
                  <CommandList>
                    <CommandEmpty className="p-4">
                      <Button
                        onClick={() => setIsFormOpen(true)}
                        className="w-full"
                        variant="outline"
                      >
                        tambah nama akun : {search}
                      </Button>
                    </CommandEmpty>
                    {Object.entries(groupedAccount).map(
                      ([groupAccount, data]) => (
                        <CommandGroup key={groupAccount} heading={groupAccount}>
                          {data.map((account) => (
                            <CommandItem
                              value={account.name}
                              key={account.id}
                              onSelect={() => {
                                field.onChange(account.id);
                                setIsActive(false);
                              }}
                            >
                              <CheckIcon
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  account.id === field.value
                                    ? "opacity-100"
                                    : "opacity-0",
                                )}
                              />
                              {account.name}
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
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>form akun</DialogTitle>
          </DialogHeader>
          <AccountForm
            onClose={() => setIsFormOpen(false)}
            data={{ name: search }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AccountInput;
