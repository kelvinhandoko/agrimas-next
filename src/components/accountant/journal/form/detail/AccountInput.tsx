import { type JournalPayload } from "@/model";
import { api } from "@/trpc/react";
import { convertAccountClass } from "@/utils/accountClassHelper";
import { type AccountClass } from "@prisma/client";
import { groupBy } from "lodash";
import {
  AlertCircleIcon,
  CheckIcon,
  ChevronDownIcon,
  FolderIcon,
  Loader2,
  PlusIcon,
  SearchIcon,
} from "lucide-react";
import React, { type FC, useEffect, useState } from "react";
import { type UseFormReturn } from "react-hook-form";
import { useInView } from "react-intersection-observer";

import { cn } from "@/lib/utils";

import { useDebounce } from "@/hooks/use-debounce";

import DialogWrapper from "@/components/DialogWrapper";
import AccountForm from "@/components/accountant/chartOfAccount/form";
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
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface AccountInput {
  form: UseFormReturn<JournalPayload>;
  index: number;
}

const AccountInput: FC<AccountInput> = ({ form, index }) => {
  const [search, setSearch] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const debounceSearch = useDebounce(search, 300);

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
  } = api.account.getInfinite.useInfiniteQuery(
    { search: debounceSearch, limit: 20 },
    {
      getNextPageParam: (lastPage) => lastPage.meta.endCursor,
    },
  );

  const groupAccounts = data?.pages.flatMap((page) => page.data) ?? [];

  // First level grouping by account class
  const groupedByAccountClass = groupBy(
    groupAccounts,
    ({ groupAccount: { accountClass } }) => accountClass,
  );

  // Second level grouping: within each account class, group by group account name
  const nestedGroupedAccounts = Object.entries(groupedByAccountClass).map(
    ([accountClass, accounts]) => {
      const accountClassData = convertAccountClass(
        accountClass as AccountClass,
      );
      return {
        accountClass: accountClassData,
        accountClassKey: accountClass,
        groupAccounts: groupBy(accounts, ({ groupAccount: { name } }) => name),
      };
    },
  );

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      void fetchNextPage();
    }
  }, [hasNextPage, inView, isFetchingNextPage, fetchNextPage]);

  const handleCreateNew = () => {
    setFormOpen(true);
    setIsActive(false);
  };

  const EmptyState = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center px-4 py-8">
          <Loader2 className="mb-3 h-8 w-8 animate-spin text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Memuatakun...</p>
        </div>
      );
    }

    if (isError) {
      return (
        <div className="flex flex-col items-center justify-center px-4 py-8">
          <AlertCircleIcon className="mb-3 h-8 w-8 text-destructive" />
          <p className="mb-2 text-sm font-medium text-destructive">
            Gagal memuat data
          </p>
          <p className="text-center text-xs text-muted-foreground">
            Terjadi kesalahan saat mengambil data akun
          </p>
        </div>
      );
    }

    if (search.trim() && groupAccounts.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center px-4 py-8">
          <div className="relative mb-4">
            <SearchIcon className="h-8 w-8 text-muted-foreground" />
            <div className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-destructive" />
          </div>
          <p className="mb-2 text-sm font-medium text-foreground">
            Tidak ditemukan {search}
          </p>
          <p className="mb-4 text-center text-xs text-muted-foreground">
            akun yang Anda cari tidak ditemukan
          </p>
          <Button
            onClick={handleCreateNew}
            size="sm"
            className="h-8 px-3 text-xs"
          >
            <PlusIcon className="mr-1 h-3 w-3" />
            Buat {search}
          </Button>
        </div>
      );
    }

    if (groupAccounts.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center px-4 py-8">
          <div className="relative mb-4">
            <FolderIcon className="h-10 w-10 text-muted-foreground" />
            <PlusIcon className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-background p-0.5 text-muted-foreground" />
          </div>
          <p className="mb-2 text-sm font-medium text-foreground">
            Belum ada akun
          </p>
          <p className="mb-4 text-center text-xs text-muted-foreground">
            Mulai dengan membuat akun pertama Anda
          </p>
          <Button
            onClick={handleCreateNew}
            size="sm"
            className="h-8 px-3 text-xs"
          >
            <PlusIcon className="mr-1 h-3 w-3" />
            Buat akun
          </Button>
        </div>
      );
    }

    return null;
  };

  return (
    <>
      <FormField
        control={form.control}
        name={`details.${index}.accountId`}
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <Popover modal open={isActive} onOpenChange={setIsActive}>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    role="combobox"
                    className={cn(
                      "justify-between bg-transparent transition-colors hover:bg-accent/50",
                      !field.value && "text-muted-foreground",
                    )}
                  >
                    {field.value
                      ? groupAccounts.find(
                          (groupAccount) => groupAccount.id === field.value,
                        )?.name
                      : "Pilih akun"}
                    <ChevronDownIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                <Command shouldFilter={false}>
                  <CommandInput
                    value={search}
                    onValueChange={setSearch}
                    placeholder="Cari akun..."
                    className="border-0 focus:ring-0"
                  />

                  <CommandList className="max-h-[300px]">
                    {nestedGroupedAccounts.length > 0 ? (
                      nestedGroupedAccounts.map(
                        ({ accountClass, accountClassKey, groupAccounts }) => (
                          <CommandGroup
                            key={accountClassKey}
                            heading={
                              <div className="flex items-center">
                                <FolderIcon className="mr-1.5 h-3 w-3 opacity-70" />
                                {accountClass}
                              </div>
                            }
                          >
                            {Object.entries(groupAccounts).map(
                              ([groupName, accounts]) => (
                                <React.Fragment key={groupName}>
                                  <div className="bg-muted/50 p-2 text-sm font-medium text-muted-foreground">
                                    {groupName}
                                  </div>
                                  {/* Individual accounts under this group */}
                                  {accounts.map((account) => (
                                    <CommandItem
                                      value={account.name}
                                      key={account.id}
                                      onSelect={() => {
                                        field.onChange(account.id);
                                        setIsActive(false);
                                      }}
                                      className="flex cursor-pointer items-center justify-between pl-6"
                                    >
                                      <div className="space-x-2">
                                        <span>{account.code}</span>
                                        <span className="truncate">
                                          {account.name}
                                        </span>
                                      </div>
                                      <CheckIcon
                                        className={cn(
                                          "mr-2 h-4 w-4",
                                          account.id === field.value
                                            ? "opacity-100"
                                            : "opacity-0",
                                        )}
                                      />
                                    </CommandItem>
                                  ))}
                                </React.Fragment>
                              ),
                            )}
                          </CommandGroup>
                        ),
                      )
                    ) : (
                      <CommandEmpty asChild>
                        <EmptyState />
                      </CommandEmpty>
                    )}

                    {/* Infinite scroll loader */}
                    {hasNextPage && (
                      <CommandItem
                        ref={ref}
                        disabled
                        className="justify-center"
                      >
                        {isFetchingNextPage ? (
                          <div className="flex items-center gap-2 py-2">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span className="text-xs text-muted-foreground">
                              Memuat lebih banyak...
                            </span>
                          </div>
                        ) : (
                          <div className="h-2" />
                        )}
                      </CommandItem>
                    )}
                  </CommandList>

                  {/* Quick add button at bottom */}
                  {search.trim() && groupAccounts.length > 0 && (
                    <div className="border-t p-2">
                      <Button
                        onClick={handleCreateNew}
                        variant="ghost"
                        size="sm"
                        className="h-8 w-full justify-start text-xs"
                      >
                        <PlusIcon className="mr-2 h-3 w-3" />
                        Buatakun baru: {search}
                      </Button>
                    </div>
                  )}
                </Command>
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )}
      />

      <DialogWrapper
        title="FormAkun Baru"
        open={formOpen}
        onOpenChange={setFormOpen}
      >
        <AccountForm
          onClose={(id) => {
            setFormOpen(false);
            if (id) {
              form.setValue(`details.${index}.accountId`, id);
            }
          }}
          data={{ name: search.trim() }}
        />
      </DialogWrapper>
    </>
  );
};

export default AccountInput;
