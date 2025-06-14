import { type AccountPayload } from "@/model";
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
import GroupAccountForm from "@/components/groupAccount/Form/GroupAccountForm";
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

interface GroupAccountInput {
  form: UseFormReturn<AccountPayload>;
}

const GroupAccountInput: FC<GroupAccountInput> = ({ form }) => {
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
  } = api.groupAccount.getInfinite.useInfiniteQuery(
    { search: debounceSearch, limit: 20 },
    {
      getNextPageParam: (lastPage) => lastPage.meta.endCursor,
    },
  );

  const groupAccounts = data?.pages.flatMap((page) => page.data) ?? [];
  const groupedGroupAccounts = groupBy(
    groupAccounts,
    ({ accountClass }) => accountClass,
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
          <p className="text-sm text-muted-foreground">
            Memuat kelompok akun...
          </p>
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
            Terjadi kesalahan saat mengambil data kelompok akun
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
            Kelompok akun yang Anda cari tidak ditemukan
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
            Belum ada kelompok akun
          </p>
          <p className="mb-4 text-center text-xs text-muted-foreground">
            Mulai dengan membuat kelompok akun pertama Anda
          </p>
          <Button
            onClick={handleCreateNew}
            size="sm"
            className="h-8 px-3 text-xs"
          >
            <PlusIcon className="mr-1 h-3 w-3" />
            Buat kelompok akun
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
        name={"groupAccountId"}
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>Kelompok Akun</FormLabel>
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
                      : "Pilih kelompok akun"}
                    <ChevronDownIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                <Command shouldFilter={false}>
                  <CommandInput
                    value={search}
                    onValueChange={setSearch}
                    placeholder="Cari kelompok akun..."
                    className="border-0 focus:ring-0"
                  />

                  <CommandList className="max-h-[300px]">
                    {Object.keys(groupedGroupAccounts).length > 0 ? (
                      Object.entries(groupedGroupAccounts).map(
                        ([accountClass, data]) => (
                          <CommandGroup
                            key={accountClass}
                            heading={
                              <div className="flex items-center">
                                <FolderIcon className="mr-1.5 h-3 w-3 opacity-70" />
                                {convertAccountClass(
                                  accountClass as AccountClass,
                                )}
                              </div>
                            }
                          >
                            {data.map((groupAccount) => (
                              <CommandItem
                                value={groupAccount.name}
                                key={groupAccount.id}
                                onSelect={() => {
                                  field.onChange(groupAccount.id);
                                  setIsActive(false);
                                }}
                                className="cursor-pointer"
                              >
                                <CheckIcon
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    groupAccount.id === field.value
                                      ? "opacity-100"
                                      : "opacity-0",
                                  )}
                                />
                                <span className="truncate">
                                  {groupAccount.name}
                                </span>
                              </CommandItem>
                            ))}
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
                        Buat kelompok akun baru: {search}
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
        title="Form Kelompok Akun"
        open={formOpen}
        onOpenChange={setFormOpen}
      >
        <GroupAccountForm
          onClose={(id) => {
            setFormOpen(false);
            if (id) {
              form.setValue("groupAccountId", id);
            }
          }}
          data={{ name: search.trim() }}
        />
      </DialogWrapper>
    </>
  );
};

export default GroupAccountInput;
