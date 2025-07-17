"use client";

import { NUMERIC_PROPS } from "@/constant";
import { type InvoiceReturnPayload } from "@/model/invoice-return.model";
import { Trash2 } from "lucide-react";
import { type FC } from "react";
import { type UseFormReturn, useFieldArray } from "react-hook-form";
import { NumericFormat } from "react-number-format";

import { useDebounce } from "@/hooks/use-debounce";

import ProductInput from "@/components/sale/saleReturn/form/detail/ProductInput";
import InvoiceReturnDetailCalculateTotal from "@/components/sale/saleReturn/form/detail/calculatedTotal";
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

interface InvoiceReturnDetailFormProps {
  form: UseFormReturn<InvoiceReturnPayload>;
  isFormLoading: boolean;
}

const InvoiceReturnDetailForm: FC<InvoiceReturnDetailFormProps> = ({
  form,
  isFormLoading,
}) => {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "detail",
    keyName: "uid",
  });

  const subTotal = form
    .watch("detail")
    ?.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);

  const total = useDebounce(subTotal, 300);

  return (
    <div className="w-full">
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[5ch]">No</TableHead>
            <TableHead>produk</TableHead>
            <TableHead className="w-[10ch]">quantity</TableHead>
            <TableHead className="w-[25ch]">harga</TableHead>
            <TableHead className="w-[25ch]">total</TableHead>
            <TableHead className="w-16"></TableHead>
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
                    name={`detail.${index}.quantity`}
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
                    name={`detail.${index}.price`}
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
                  <InvoiceReturnDetailCalculateTotal
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
            ))}
            <TableRow>
              <TableCell colSpan={6}>
                <Button
                  className="w-full"
                  onClick={() =>
                    append({
                      productId: "",
                      price: 0,
                      quantity: 1,
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
            <TableCell colSpan={4} className="text-right font-medium">
              Total:
            </TableCell>
            <TableCell className="font-bold">
              <NumericFormat
                value={total}
                {...NUMERIC_PROPS}
                displayType="text"
              />
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={4}></TableCell>
            <TableCell colSpan={2}>
              <div className="flex w-full items-center gap-2">
                <Button
                  isLoading={isFormLoading}
                  className="flex-1"
                  variant="destructiveOnline"
                >
                  reset
                </Button>
                <Button
                  type="submit"
                  isLoading={isFormLoading}
                  className="flex-1"
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

export default InvoiceReturnDetailForm;
