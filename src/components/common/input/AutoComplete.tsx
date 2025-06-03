"use client";

import { CommandList } from "cmdk";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import * as React from "react";
import { useInView } from "react-intersection-observer";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  Command,
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
}: AutoCompleteProps<T>) {
  if (!labelKey && !customLabel) {
    throw new Error("must put either labelKey or customLabel");
  }
  const [input, setInput] = React.useState("");

  const [open, setOpen] = React.useState(false);
  const container = React.useRef(null);

  const [ref, inView] = useInView();

  const selectedData = options.find((option) => option[valueKey] === value);
  const handleChangeInput = (input: string) => {
    setInput(input);
    onInputChange?.(input);
  };

  React.useEffect(() => {
    if (inView && hasMore) {
      fetchMore();
    }
  }, [inView]);

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            disabled={disabled}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "flex h-10 w-72 max-w-full items-center justify-start rounded-md border border-input bg-transparent px-3 py-2 text-sm font-normal ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              className,
            )}
          >
            <div
              className={cn("", {
                "text-muted-foreground": !value,
                "flex flex-1 items-center gap-2 text-start": !customLabel,
              })}
            >
              {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
              {startLabel && selectedData && <>{startLabel(selectedData)}</>}
              {value ? (
                customLabel && selectedData ? (
                  <>{customLabel(selectedData)}</>
                ) : (
                  labelKey && selectedData && (selectedData[labelKey] as string)
                )
              ) : (
                placeholder
              )}
            </div>
            <ChevronsUpDown className="ml-auto h-4 w-3 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="min-w-full p-0">
          <Command shouldFilter={false}>
            <CommandInput
              value={input}
              onValueChange={handleChangeInput}
              placeholder="Search option..."
            />
            {isLoading ? (
              <div className="flex w-full items-center justify-center p-2 py-6">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            ) : (
              <>
                {onAddNew && input && (
                  <CommandGroup heading="new data" forceMount>
                    <CommandItem>
                      <Button
                        className="w-full"
                        onClick={() => onAddNew(input)}
                      >
                        tambah data baru : {input}
                      </Button>
                    </CommandItem>
                  </CommandGroup>
                )}
                {!input && defaultValue && (
                  <CommandGroup heading="default selected" forceMount>
                    <CommandList>
                      <CommandItem
                        value={defaultValue.id}
                        onSelect={() => {
                          onSelect(defaultValue.id);
                          setOpen(false);
                        }}
                      >
                        <Check
                          className={cn("mr-2 h-4 w-4 opacity-0", {
                            "opacity-100": value === defaultValue.id,
                          })}
                        />
                        {customLabel ? (
                          <>{customLabel(defaultValue as T)}</>
                        ) : (
                          <>
                            {startLabel && <>{startLabel(defaultValue as T)}</>}
                            {labelKey &&
                              (defaultValue[labelKey] as React.ReactNode)}
                          </>
                        )}
                      </CommandItem>
                    </CommandList>
                  </CommandGroup>
                )}

                <CommandGroup
                  className="max-h-48 overflow-scroll"
                  heading="data"
                  ref={container}
                >
                  {isLoading ? (
                    <CommandItem className="p-4 text-center">
                      {" "}
                      <Loader2 className="animate-spin" />
                    </CommandItem>
                  ) : (
                    <CommandList>
                      {!options.length ? (
                        <CommandItem className="p-2 text-center">
                          data tidak ditemukan
                        </CommandItem>
                      ) : (
                        options.map((option, i) => (
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
                          >
                            <Check
                              className={cn("mr-2 h-4 w-4 opacity-0", {
                                "opacity-100": value === option[valueKey],
                              })}
                            />
                            {customLabel ? (
                              <>{customLabel(option)}</>
                            ) : (
                              <>
                                {startLabel && <>{startLabel(option)}</>}
                                {labelKey &&
                                  (option[labelKey] as React.ReactNode)}
                              </>
                            )}
                          </CommandItem>
                        ))
                      )}
                      <CommandItem
                        className="flex h-6 w-full items-center justify-center"
                        ref={ref}
                      >
                        {!options.length ? (
                          ""
                        ) : isFetching ? (
                          <Loader2 className="animate-spin" />
                        ) : (
                          <span className="text-xs text-muted-foreground">
                            no more data.
                          </span>
                        )}
                      </CommandItem>
                    </CommandList>
                  )}
                </CommandGroup>
              </>
            )}
          </Command>
        </PopoverContent>
      </Popover>
    </>
  );
}
