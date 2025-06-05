"use client";

import { NUMERIC_PROPS } from "@/constant";
import { type SalesInvoicePayload } from "@/model/sales-invoice.model";
import { Trash2 } from "lucide-react";
import { type FC } from "react";
import { type UseFormReturn, useFieldArray } from "react-hook-form";
import { NumericFormat } from "react-number-format";

import { useDebounce } from "@/hooks/use-debounce";

import ProductInput from "@/components/sale/saleFaktur/form/detail/ProductInput";
import SalesInvoiceDetailCalculateTotal from "@/components/sale/saleFaktur/form/detail/calculatedTotal";
import { Button } from "@/components/ui/button";
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

interface SalesInvoiceDetailFormProps {
  form: UseFormReturn<SalesInvoicePayload>;
  isFormLoading: boolean;
}

const SalesInvoiceDetailForm: FC<SalesInvoiceDetailFormProps> = ({
  form,
  isFormLoading,
}) => {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "details",
    keyName: "uid",
  });

  const subTotal = form
    .watch("details")
    .reduce(
      (acc, curr) =>
        acc + curr.price * curr.quantity - curr.discount + curr.tax,
      0,
    );

  const debounceSubTotal = useDebounce(subTotal, 300);

  const total = subTotal - form.watch("discount") + form.watch("tax");

  const debounceTotal = useDebounce(total, 300) ?? 0;
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[5ch]">No</TableHead>
            <TableHead>produk</TableHead>
            <TableHead className="w-[10ch]">quantity</TableHead>
            <TableHead className="w-[20ch]">harga</TableHead>
            <TableHead className="w-[20ch]">diskon</TableHead>
            <TableHead className="w-[20ch]">pajak</TableHead>
            <TableHead className="w-[25ch]">total</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <>
            {fields.map((field, index) => (
              <TableRow key={field.uid}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <ProductInput form={form} index={index} />
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
                            value={field.value === 0 ? "" : field.value}
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
                <TableCell>
                  <FormField
                    control={form.control}
                    name={`details.${index}.tax`}
                    render={({ field }) => (
                      <FormItem className="flex flex-col items-start justify-start gap-2">
                        <FormControl>
                          <NumericFormat
                            placeholder="masukan pajak"
                            value={field.value === 0 ? "" : field.value}
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
                <TableCell>
                  <SalesInvoiceDetailCalculateTotal form={form} index={index} />
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
            ))}
            <TableRow>
              <TableCell colSpan={8}>
                <Button
                  className="w-full"
                  onClick={() =>
                    append({
                      productId: "",
                      discount: 0,
                      price: 0,
                      quantity: 1,
                      tax: 0,
                    })
                  }
                >
                  + detail
                </Button>
              </TableCell>
            </TableRow>
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
            <TableCell></TableCell>
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
            <TableCell></TableCell>
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
            <TableCell></TableCell>
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
            <TableCell></TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={6}></TableCell>
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

export default SalesInvoiceDetailForm;
