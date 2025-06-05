"use client";

import { Box, Grid } from "@radix-ui/themes";
import { PlusIcon, Trash2Icon } from "lucide-react";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { Control, useFieldArray, useWatch } from "react-hook-form";

import { cn } from "@/lib/utils";

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
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { dummyPurchaseOrder } from "../new/AddNewPurchaseReturnPage";

const EditPurchaseReturnRow = ({ control }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "detail",
  });

  const detail = useWatch({ control, name: "detail" }) || [];

  const handleRemoveRow = (index) => {
    console.log(index);
    if (detail.length > 1) {
      remove(index);
    }
  };

  return (
    <Box>
      <Box className="flex justify-end">
        <Button
          type="button"
          onClick={() =>
            append({
              productId: "",
              quantity: 1,
            })
          }
        >
          <PlusIcon /> Tambah Baris
        </Button>
      </Box>
      {fields.map((value, index) => (
        <Grid
          columns={{ initial: "1", md: "5" }}
          gap="4"
          className="mt-3"
          key={value.id}
        >
          <FormField
            control={control}
            name={`detail.${index}.productId`}
            render={({ field }) => (
              <FormItem className="col-span-2 flex w-full flex-col gap-2">
                <FormLabel>Nama Barang</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-full justify-between",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        product
                        <ChevronsUpDownIcon className="opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput
                        placeholder="Search produk..."
                        className="h-9"
                      />
                      <CommandList>
                        <CommandEmpty>No product found.</CommandEmpty>
                        <CommandGroup>
                          {dummyPurchaseOrder &&
                            dummyPurchaseOrder[0]?.items.map((product) => (
                              <CommandItem
                                value={product.productId}
                                key={product.productId}
                              >
                                {product.name}
                                <CheckIcon
                                  className={cn(
                                    "ml-auto",
                                    product.productId === field.value
                                      ? "opacity-100"
                                      : "opacity-0",
                                  )}
                                />
                              </CommandItem>
                            ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name={`detail.${index}.quantity`}
            render={({ field }) => (
              <FormItem className="col-span-2 flex w-full flex-col gap-2">
                <FormLabel>Qty</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    min={0}
                    // onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    //   setValue(
                    //     `detail.${index}.quantity`,
                    //     Number(event.target.value),
                    //   );
                    // }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Box>
            #
            <Box>
              <Trash2Icon
                className={`mt-4 ${detail.length > 1 ? "cursor-pointer text-red-600" : "text-red-100"}`}
                onClick={() => handleRemoveRow(index)}
              />
            </Box>
          </Box>
        </Grid>
      ))}
    </Box>
  );
};

export default EditPurchaseReturnRow;
