"use client";

import { NUMERIC_PROPS } from "@/constant";
import { type PurchaseInvoicePayload } from "@/model/purchase-invoice";
import { type FC } from "react";
import { type UseFormReturn, useFieldArray } from "react-hook-form";
import { NumericFormat } from "react-number-format";

import { cn } from "@/lib/utils";

import { useDebounce } from "@/hooks/use-debounce";

import PurchaseInvoiceDetailCalculateTotal from "@/components/purchase/purchaseFaktur/form/detail/calculatedTotal";
import { Button } from "@/components/ui/button";
import { CardDescription } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface PurchaseInvoiceDetailFormProps {
  form: UseFormReturn<PurchaseInvoicePayload>;
  isFormLoading: boolean;
}

const PurchaseInvoiceDetailForm: FC<PurchaseInvoiceDetailFormProps> = ({
  form,
  isFormLoading,
}) => {
  const { fields } = useFieldArray({
    control: form.control,
    name: "details",
    keyName: "uid",
  });

  const subTotal = form
    .watch("details")
    ?.reduce(
      (acc, curr) =>
        acc + curr.price * curr.quantity - (curr.discount ?? 0) + curr.tax,
      0,
    );

  const debounceSubTotal = useDebounce(subTotal, 300);

  const total = subTotal - form.watch("discount") + form.watch("tax");

  const debounceTotal = useDebounce(total, 300) ?? 0;

  if (!fields.length)
    return (
      <div className="pt-8 text-center">
        <p>Silahkan pilih surat jalan pembelian</p>
      </div>
    );
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[5ch]">No</TableHead>
            <TableHead>produk</TableHead>
            <TableHead className="w-[20ch]">quantity</TableHead>
            <TableHead className="w-[20ch]">harga</TableHead>
            <TableHead className="w-[10ch]">diskon</TableHead>
            <TableHead className="w-[10ch]">pajak</TableHead>
            <TableHead className="w-[25ch]">total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <>
            {fields.map((field, index) => {
              const isFullfilled = field.totalReceive === field.maxQuantity;
              return (
                <TableRow
                  key={field.uid}
                  className={cn(isFullfilled && "line-through")}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <CardDescription>{field.productName}</CardDescription>
                  </TableCell>
                  <TableCell>
                    <FormField
                      control={form.control}
                      name={`details.${index}.quantity`}
                      render={({ field }) => (
                        <FormItem className="flex flex-col items-start justify-start gap-2">
                          <FormControl>
                            <NumericFormat
                              placeholder="masukan jumlah"
                              value={field.value}
                              onValueChange={({ floatValue }) =>
                                field.onChange(floatValue)
                              }
                              {...NUMERIC_PROPS}
                              displayType="text"
                              prefix=""
                            />
                          </FormControl>
                          <FormMessage className="line-clamp-2" />
                        </FormItem>
                      )}
                    />
                  </TableCell>
                  <TableCell>
                    <FormField
                      control={form.control}
                      name={`details.${index}.price`}
                      render={({ field }) => (
                        <FormItem className="flex flex-col items-start justify-start gap-2">
                          <FormControl>
                            <NumericFormat
                              placeholder="masukan jumlah"
                              value={field.value}
                              onValueChange={({ floatValue }) =>
                                field.onChange(floatValue)
                              }
                              {...NUMERIC_PROPS}
                              displayType="text"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TableCell>
                  <TableCell>
                    <FormField
                      control={form.control}
                      name={`details.${index}.discount`}
                      render={({ field }) => (
                        <FormItem className="flex flex-col items-start justify-start gap-2">
                          <FormControl>
                            <NumericFormat
                              placeholder="masukan diskon"
                              value={field.value}
                              onValueChange={({ floatValue }) =>
                                field.onChange(floatValue)
                              }
                              {...NUMERIC_PROPS}
                              displayType="text"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TableCell>
                  <TableCell>
                    <FormField
                      control={form.control}
                      name={`details.${index}.tax`}
                      render={({ field }) => (
                        <FormItem className="flex flex-col items-start justify-start gap-2">
                          <FormControl>
                            <NumericFormat
                              placeholder="masukan pajak"
                              value={field.value}
                              onValueChange={({ floatValue }) =>
                                field.onChange(floatValue)
                              }
                              {...NUMERIC_PROPS}
                              displayType="text"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TableCell>
                  <TableCell>
                    <PurchaseInvoiceDetailCalculateTotal
                      form={form}
                      index={index}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={5}></TableCell>
            <TableCell>sub total</TableCell>
            <TableCell>
              <NumericFormat
                value={debounceSubTotal}
                {...NUMERIC_PROPS}
                displayType="text"
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={5}></TableCell>
            <TableCell>diskon</TableCell>
            <TableCell>
              <FormField
                control={form.control}
                name={"discount"}
                render={({ field }) => (
                  <FormItem className="flex flex-col items-start justify-start gap-2">
                    <FormControl>
                      <NumericFormat
                        className="pl-0"
                        placeholder="masukan jumlah diskon"
                        value={field.value}
                        onValueChange={({ floatValue }) =>
                          field.onChange(floatValue)
                        }
                        {...NUMERIC_PROPS}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={5}></TableCell>
            <TableCell>pajak</TableCell>
            <TableCell>
              <FormField
                control={form.control}
                name={"tax"}
                render={({ field }) => (
                  <FormItem className="flex flex-col items-start justify-start gap-2">
                    <FormControl>
                      <NumericFormat
                        className="pl-0"
                        placeholder="masukan jumlah pajak"
                        value={field.value}
                        onValueChange={({ floatValue }) =>
                          field.onChange(floatValue)
                        }
                        {...NUMERIC_PROPS}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={5}></TableCell>
            <TableCell>total</TableCell>
            <TableCell>
              <NumericFormat
                value={debounceTotal}
                {...NUMERIC_PROPS}
                displayType="text"
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={5}></TableCell>
            <TableCell colSpan={2}>
              <div className="flex items-center gap-2">
                {" "}
                <Button
                  type="submit"
                  isLoading={isFormLoading}
                  className="w-full"
                >
                  simpan
                </Button>
              </div>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default PurchaseInvoiceDetailForm;
