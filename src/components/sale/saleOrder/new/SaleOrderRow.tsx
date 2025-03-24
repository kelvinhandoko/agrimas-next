"use client";

import { SalePayload } from "@/model/dummy/sale-order.model";
import { type PurchasePayload } from "@/model/purchase.model";
import { api } from "@/trpc/react";
import { formatPrice } from "@/utils/format-price";
import { Box, Grid } from "@radix-ui/themes";
import { PlusIcon, Trash2Icon } from "lucide-react";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";
import {
  Control,
  UseFormSetValue,
  UseFormWatch,
  useFieldArray,
  useWatch,
} from "react-hook-form";

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
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import SaleOrderSummaryForm from "./SaleOrderSummaryForm";

interface SaleOrderProps {
  control: Control<SalePayload>;
  setValue: UseFormSetValue<SalePayload>;
  watch: UseFormWatch<SalePayload>;
}

const SaleOrder = ({ control, setValue, watch }: SaleOrderProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "detail",
  });
  const [subTotal, setSubTotal] = useState<number>(0);
  const [totalAll, setTotalAll] = useState<number>(0);

  const [totalPerItem, setTotalPerItem] = useState<number[]>([]);

  const { data: dataProducts, isLoading } = api.product.getAll.useQuery({});

  const detail = useWatch({ control, name: "detail" }) || [];
  const discountAll = useWatch({ control, name: "discount" }) || 0;
  const ppnAll = useWatch({ control, name: "ppn" }) || 0;

  const handleRemoveRow = (index: number) => {
    console.log(index);
    if (detail.length > 1) {
      remove(index);
    }
  };
  const handleSelectProduct = (
    productId: string,
    averagePrice: number,
    index: number,
  ) => {
    setValue(`detail.${index}.productId`, productId);
  };

  useEffect(() => {
    const totalPerItemArray = detail.map((item) => {
      const quantity = item.quantity || 1;
      const price = item.price || 0;
      const discount = item.discount || 0;
      const discountPercent = discount / 100;
      const ppn = item.ppn || 0;
      const ppnPercent = ppn / 100;

      const totalBeforeTax =
        quantity * price - quantity * price * discountPercent;
      const ppnAmount = totalBeforeTax * ppnPercent;
      return totalBeforeTax + ppnAmount;
    });

    setTotalPerItem(totalPerItemArray);

    const total = totalPerItemArray.reduce((acc, curr) => acc + curr, 0);
    setSubTotal(total);
    setTotalAll(total);
  }, [detail]);

  useEffect(() => {
    const discountAllPercent = discountAll / 100;
    const ppnAllPercent = ppnAll / 100;
    const totalAllBeforeTax = subTotal - subTotal * discountAllPercent;
    const ppnAllAmount = totalAllBeforeTax * ppnAllPercent;
    const totalAllAfterTax = totalAllBeforeTax + ppnAllAmount;
    setTotalAll(totalAllAfterTax);
  }, [discountAll, ppnAll, subTotal]);

  return (
    <Box>
      <Box className="flex justify-end">
        <Button
          type="button"
          onClick={() =>
            append({
              productId: "",
              quantity: 1,
              price: 0,
              discount: 0,
              ppn: 0,
            })
          }
        >
          <PlusIcon /> Tambah Baris
        </Button>
      </Box>
      {fields.map((value, index) => (
        <Grid
          columns={{ initial: "1", md: "7" }}
          gap="4"
          className="mt-3"
          key={value.id}
        >
          <FormField
            control={control}
            name={`detail.${index}.productId`}
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-2">
                <FormLabel>Kode Barang</FormLabel>
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
                        {field.value
                          ? dataProducts?.[0].find(
                              (product) => product.id === field.value,
                            )?.name
                          : "Select product"}
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
                          {dataProducts &&
                            dataProducts?.[0].map((product) => (
                              <CommandItem
                                value={product.id}
                                key={product.id}
                                onSelect={() =>
                                  handleSelectProduct(
                                    product.id,
                                    product.averagePrice,
                                    index,
                                  )
                                }
                              >
                                {product.name}
                                <CheckIcon
                                  className={cn(
                                    "ml-auto",
                                    product.id === field.value
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
              <FormItem className="flex w-full flex-col gap-2">
                <FormLabel>Qty</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    min={0}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                      setValue(
                        `detail.${index}.quantity`,
                        Number(event.target.value),
                      );
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name={`detail.${index}.price`}
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-2">
                <FormLabel>Harga Barang</FormLabel>
                <FormControl>
                  <Input type="number" {...field} min={0} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name={`detail.${index}.discount`}
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-2">
                <FormLabel>Diskon</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    min={0}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                      setValue(
                        `detail.${index}.discount`,
                        Number(event.target.value),
                      );
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name={`detail.${index}.ppn`}
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-2">
                <FormLabel>PPN</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    min={0}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                      setValue(
                        `detail.${index}.ppn`,
                        Number(event.target.value),
                      );
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="totalPerItem">Total</Label>
            <Input
              type="text"
              id="totalPerItem"
              value={formatPrice(totalPerItem[index] ?? 0)}
              readOnly
            />
          </div>
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
      <hr className="my-7" />
      <Box className="my-5">
        <SaleOrderSummaryForm
          control={control}
          subTotal={subTotal}
          totalAll={totalAll}
          setValue={setValue}
        />
      </Box>
    </Box>
  );
};

export default SaleOrder;
