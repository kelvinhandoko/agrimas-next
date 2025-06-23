"use client";

import { CommandList } from "cmdk";
import {
  AlertCircle,
  Check,
  ChevronsUpDown,
  Database,
  Inbox,
  Loader2,
  Plus,
  Search,
} from "lucide-react";
import * as React from "react";
import { useInView } from "react-intersection-observer";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface AutoCompleteProps<T> {
  value?: string;
  onSelect: (value: string | number) => void;
  valueKey: keyof T;
  labelKey?: keyof T;
  startLabel?: (data: T) => React.ReactNode;
  options: T[];
  customLabel?: (data: T) => React.ReactNode;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  isLoading?: boolean;
  isFetching?: boolean;
  onAddNew?: (data: string) => void;
  onInputChange?: (input: string) => void;
  hasMore: boolean;
  fetchMore: () => void;
  defaultValue?: Partial<T> & { id: string };
  isError?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
  searchEmptyTitle?: string;
  searchEmptyDescription?: string;
}

export function AutoComplete<T>({
  value,
  onSelect,
  valueKey,
  labelKey,
  className,
  startLabel,
  options,
  placeholder = "Select options...",
  disabled,
  isLoading,
  fetchMore,
  isFetching = false,
  hasMore,
  onAddNew,
  onInputChange,
  defaultValue,
  customLabel,
  isError = false,
  emptyTitle = "Tidak ada data",
  emptyDescription = "Belum ada data yang tersedia saat ini",
  searchEmptyTitle = "Tidak ditemukan",
  searchEmptyDescription = "Coba kata kunci yang berbeda",
}: AutoCompleteProps<T>) {
  if (!labelKey && !customLabel) {
    throw new Error("must put either labelKey or customLabel");
  }

  const [input, setInput] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const [ref, inView] = useInView();

  const selectedData = options.find((option) => option[valueKey] === value);

  const handleChangeInput = (input: string) => {
    setInput(input);
    onInputChange?.(input);
  };

  const handleAddNew = () => {
    if (onAddNew && input.trim()) {
      onAddNew(input.trim());
      setOpen(false);
    }
  };

  React.useEffect(() => {
    if (inView && hasMore && !isFetching) {
      fetchMore();
    }
  }, [inView, hasMore, isFetching, fetchMore]);

  // Enhanced Empty State Components
  const LoadingState = () => (
    <div className="flex flex-col items-center justify-center px-4 py-8">
      <Loader2 className="mb-3 h-8 w-8 animate-spin text-primary" />
      <p className="text-sm text-muted-foreground">Memuat data...</p>
    </div>
  );

  const ErrorState = () => (
    <div className="flex flex-col items-center justify-center px-4 py-8">
      <AlertCircle className="mb-3 h-8 w-8 text-destructive" />
      <p className="mb-1 text-sm font-medium text-destructive">
        Gagal memuat data
      </p>
      <p className="text-center text-xs text-muted-foreground">
        Terjadi kesalahan saat mengambil data
      </p>
    </div>
  );

  const SearchEmptyState = () => (
    <div className="flex flex-col items-center justify-center px-4 py-8">
      <div className="relative mb-4">
        <Search className="h-8 w-8 text-muted-foreground" />
        <div className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-destructive" />
      </div>
      <p className="mb-1 text-sm font-medium text-foreground">
        {searchEmptyTitle}
      </p>
      <p className="mb-4 text-center text-xs text-muted-foreground">
        {searchEmptyDescription}
      </p>
      {onAddNew && input.trim() && (
        <Button onClick={handleAddNew} size="sm" className="h-8 px-3 text-xs">
          <Plus className="mr-1 h-3 w-3" />
          Buat {input.trim()}
        </Button>
      )}
    </div>
  );

  const InitialEmptyState = () => (
    <div className="flex flex-col items-center justify-center px-4 py-8">
      <div className="relative mb-4">
        <Database className="h-10 w-10 text-muted-foreground" />
        <Inbox className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-background p-0.5 text-muted-foreground" />
      </div>
      <p className="mb-1 text-sm font-medium text-foreground">{emptyTitle}</p>
      <p className="mb-4 text-center text-xs text-muted-foreground">
        {emptyDescription}
      </p>
      {onAddNew && (
        <Button
          onClick={() => onAddNew("")}
          size="sm"
          variant="outline"
          className="h-8 px-3 text-xs"
        >
          <Plus className="mr-1 h-3 w-3" />
          Tambah data baru
        </Button>
      )}
    </div>
  );

  const renderEmptyState = () => {
    if (isLoading) return <LoadingState />;
    if (isError) return <ErrorState />;
    if (input.trim() && options.length === 0) return <SearchEmptyState />;
    if (options.length === 0) return <InitialEmptyState />;
    return null;
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          disabled={disabled}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "flex h-10 w-72 max-w-full items-center justify-start rounded-md border border-input bg-transparent px-3 py-2 text-sm font-normal ring-offset-background transition-colors hover:bg-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
        >
          <div
            className={cn("flex flex-1 items-center", {
              "text-muted-foreground": !value,
              "flex flex-1 items-center gap-2 text-start": !customLabel,
            })}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {startLabel && selectedData && <>{startLabel(selectedData)}</>}
            <span className="truncate">
              {value ? (
                customLabel && selectedData ? (
                  <>{customLabel(selectedData)}</>
                ) : (
                  labelKey && selectedData && (selectedData[labelKey] as string)
                )
              ) : (
                placeholder
              )}
            </span>
          </div>
          <ChevronsUpDown className="ml-auto h-4 w-3 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
        <Command shouldFilter={false}>
          <div className="flex items-center border-b px-3">
            <CommandInput
              value={input}
              onValueChange={handleChangeInput}
              placeholder="Cari data..."
              className="border-0 focus:ring-0"
            />
          </div>

          {isLoading && !options.length ? (
            <LoadingState />
          ) : isError ? (
            <ErrorState />
          ) : (
            <CommandList className="max-h-[300px]">
              {/* Add New Option */}
              {onAddNew && input.trim() && (
                <CommandGroup
                  heading={
                    <div className="flex items-center">
                      <Plus className="mr-1.5 h-3 w-3 opacity-70" />
                      Data Baru
                    </div>
                  }
                >
                  <CommandItem
                    onSelect={handleAddNew}
                    className="cursor-pointer"
                  >
                    <Plus className="mr-2 h-4 w-4 text-primary" />
                    <span>tambah {input.trim()}</span>
                  </CommandItem>
                </CommandGroup>
              )}

              {/* Default Value */}
              {!input && defaultValue && (
                <CommandGroup
                  heading={
                    <div className="flex items-center">
                      <Check className="mr-1.5 h-3 w-3 opacity-70" />
                      Default
                    </div>
                  }
                >
                  <CommandItem
                    value={defaultValue.id}
                    onSelect={() => {
                      onSelect(defaultValue.id);
                      setOpen(false);
                    }}
                    className="cursor-pointer"
                  >
                    <Check
                      className={cn("mr-2 h-4 w-4 opacity-0", {
                        "opacity-100": value === defaultValue.id,
                      })}
                    />
                    <div className="flex items-center gap-2 truncate">
                      {customLabel ? (
                        <>{customLabel(defaultValue as T)}</>
                      ) : (
                        <>
                          {startLabel && <>{startLabel(defaultValue as T)}</>}
                          {labelKey &&
                            (defaultValue[labelKey] as React.ReactNode)}
                        </>
                      )}
                    </div>
                  </CommandItem>
                </CommandGroup>
              )}

              {/* Options List */}
              {options.length > 0 ? (
                <CommandGroup
                  heading={
                    <div className="flex items-center">
                      <Database className="mr-1.5 h-3 w-3 opacity-70" />
                      Data ({options.length})
                    </div>
                  }
                >
                  {options.map((option, i) => (
                    <CommandItem
                      key={i}
                      value={
                        (customLabel
                          ? customLabel(option)
                          : labelKey && option[labelKey]) as string
                      }
                      onSelect={() => {
                        onSelect(
                          (option[valueKey] as string) === value
                            ? ""
                            : (option[valueKey] as string),
                        );
                        setOpen(false);
                      }}
                      className="cursor-pointer"
                    >
                      <Check
                        className={cn("mr-2 h-4 w-4 opacity-0", {
                          "opacity-100": value === option[valueKey],
                        })}
                      />
                      <div className="flex items-center gap-2 truncate">
                        {customLabel ? (
                          <>{customLabel(option)}</>
                        ) : (
                          <>
                            {startLabel && <>{startLabel(option)}</>}
                            {labelKey && (option[labelKey] as React.ReactNode)}
                          </>
                        )}
                      </div>
                    </CommandItem>
                  ))}

                  {/* Infinite scroll loader */}
                  {hasMore && (
                    <CommandItem ref={ref} disabled className="justify-center">
                      {isFetching ? (
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
                </CommandGroup>
              ) : (
                <CommandEmpty asChild>{renderEmptyState()}</CommandEmpty>
              )}

              {/* Quick add at bottom for existing data */}
              {onAddNew && input.trim() && options.length > 0 && (
                <div className="border-t p-2">
                  <Button
                    onClick={handleAddNew}
                    variant="ghost"
                    size="sm"
                    className="h-8 w-full justify-start text-xs"
                  >
                    <Plus className="mr-2 h-3 w-3" />
                    Buat ata baru: {input.trim()}
                  </Button>
                </div>
              )}
            </CommandList>
          )}
        </Command>
      </PopoverContent>
    </Popover>
  );
}
