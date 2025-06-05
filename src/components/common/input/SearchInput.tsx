"use client";

import { useSearchParams } from "next/navigation";
import { type FC, Suspense, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

import { useDebounce } from "@/hooks/use-debounce";
import { useUpdateParams } from "@/hooks/use-update-params";

import { Input } from "@/components/ui/input";

interface IProps {
  className?: string;
  placeholder: string;
  queryKey?: string;
}

export const SearchInput: FC<IProps> = ({
  className,
  placeholder,
  queryKey,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const searchParams = useSearchParams();
  const { updateParams } = useUpdateParams();

  const search = searchParams.get("search")?.toString() ?? "";
  const [searchTerm, setSearchTerm] = useState<string>(search);

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Trigger the search whenever the debounced value changes
  useEffect(() => {
    updateParams(queryKey ?? "search", debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  // Handle keyboard shortcut for focusing the input
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <Suspense>
      <div className={cn("h relative w-full", className)}>
        <Input
          className={cn(
            "w-full overflow-clip bg-primary-foreground placeholder:capitalize",
            searchTerm ? "pr-2" : "pr-10",
          )}
          type="search"
          ref={inputRef}
          placeholder={placeholder}
          onChange={(e) => setSearchTerm(e.target.value)}
          defaultValue={search}
        />
      </div>
    </Suspense>
  );
};
