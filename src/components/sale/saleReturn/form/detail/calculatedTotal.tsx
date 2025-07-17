"use client";

import { NUMERIC_PROPS } from "@/constant";
import { type InvoiceReturnPayload } from "@/model/invoice-return.model";
import { type FC } from "react";
import { type UseFormReturn } from "react-hook-form";
import { NumericFormat } from "react-number-format";

import { useDebounce } from "@/hooks/use-debounce";

interface InvoiceReturnDetailCalculateTotalProps {
  form: UseFormReturn<InvoiceReturnPayload>;
  index: number;
}

const InvoiceReturnDetailCalculateTotal: FC<
  InvoiceReturnDetailCalculateTotalProps
> = ({ form, index }) => {
  const field = form.watch(`detail.${index}`);
  const total = field.price * field.quantity;
  const debounceTotal = useDebounce(total, 300);
  return (
    <NumericFormat
      value={debounceTotal}
      {...NUMERIC_PROPS}
      displayType="text"
    />
  );
};

export default InvoiceReturnDetailCalculateTotal;
