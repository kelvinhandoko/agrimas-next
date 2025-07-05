"use client";

import { NUMERIC_PROPS } from "@/constant";
import { type SalesInvoicePayload } from "@/model/sales-invoice.model";
import { type FC } from "react";
import { type UseFormReturn } from "react-hook-form";
import { NumericFormat } from "react-number-format";

import { useDebounce } from "@/hooks/use-debounce";

interface SalesInvoiceDetailCalculateTotalProps {
  form: UseFormReturn<SalesInvoicePayload>;
  index: number;
}

const SalesInvoiceDetailCalculateTotal: FC<
  SalesInvoiceDetailCalculateTotalProps
> = ({ form, index }) => {
  const field = form.watch(`details.${index}`);
  const total = (field.price - field.discount) * field.quantity + field.tax;
  const debounceTotal = useDebounce(total, 300);
  return (
    <NumericFormat
      value={debounceTotal}
      {...NUMERIC_PROPS}
      displayType="text"
    />
  );
};

export default SalesInvoiceDetailCalculateTotal;
