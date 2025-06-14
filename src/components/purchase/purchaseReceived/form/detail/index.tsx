"use client";

import { NUMERIC_PROPS } from "@/constant";
import { type ReceiveItemPayload } from "@/model/recieve-item.model";
import { Trash2 } from "lucide-react";
import { type FC } from "react";
import { type UseFormReturn, useFieldArray } from "react-hook-form";
import { NumericFormat } from "react-number-format";

import { cn } from "@/lib/utils";

import { useDebounce } from "@/hooks/use-debounce";

import PurchaseReceivedDetailCalculateTotal from "@/components/purchase/purchaseReceived/form/detail/calculatedTotal";
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

interface PurchaseReceivedDetailFormProps {
  form: UseFormReturn<ReceiveItemPayload>;
  isFormLoading: boolean;
}

const PurchaseReceiveDetailForm: FC<PurchaseReceivedDetailFormProps> = ({
  form,
  isFormLoading,
}) => {
  const { fields, remove } = useFieldArray({
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

  if (!fields.length) return null;
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[5ch]">No</TableHead>
            <TableHead>produk</TableHead>
            <TableHead className="w-[20ch]">quantity</TableHead>
            <TableHead className="w-[10ch]">jlh. permintaan</TableHead>
            <TableHead className="w-[10ch]">diterima</TableHead>
            <TableHead className="w-[20ch]">harga</TableHead>
            <TableHead className="w-[10ch]">diskon</TableHead>
            <TableHead className="w-[10ch]">pajak</TableHead>
            <TableHead className="w-[25ch]">total</TableHead>
            <TableHead className="w-[20ch]"></TableHead>
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
                      name={`details.${index}.maxQuantity`}
                      render={({ field }) => (
                        <FormItem className="flex flex-col items-start justify-start gap-2">
                          <FormControl>
                            <NumericFormat
                              value={field.value > 0 ? field.value : "-"}
                              onValueChange={({ floatValue }) =>
                                field.onChange(floatValue)
                              }
                              prefix=""
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
                      name={`details.${index}.totalReceive`}
                      render={({ field }) => (
                        <FormItem className="flex flex-col items-start justify-start gap-2">
                          <FormControl>
                            <NumericFormat
                              value={field.value > 0 ? field.value : "-"}
                              onValueChange={({ floatValue }) =>
                                field.onChange(floatValue)
                              }
                              prefix=""
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
                    <PurchaseReceivedDetailCalculateTotal
                      form={form}
                      index={index}
                    />
                  </TableCell>
                  <TableCell className="w-16">
                    <Button
                      onClick={() => remove(index)}
                      variant="destructive"
                      size="icon"
                    >
                      <Trash2 />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={8}></TableCell>
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
            <TableCell colSpan={8}></TableCell>
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
            <TableCell colSpan={8}></TableCell>
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
            <TableCell colSpan={8}></TableCell>
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
            <TableCell colSpan={8}></TableCell>
            <TableCell colSpan={2}>
              <div className="flex items-center gap-2">
                <Button
                  isLoading={isFormLoading}
                  className="w-full"
                  variant="destructiveOnline"
                >
                  reset
                </Button>
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

export default PurchaseReceiveDetailForm;
