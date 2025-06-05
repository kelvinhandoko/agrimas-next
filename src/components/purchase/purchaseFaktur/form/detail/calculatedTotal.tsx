"use client";

import { NUMERIC_PROPS } from "@/constant";
import { type PurchaseInvoicePayload } from "@/model/purchase-invoice";
import { type FC } from "react";
import { type UseFormReturn } from "react-hook-form";
import { NumericFormat } from "react-number-format";

import { useDebounce } from "@/hooks/use-debounce";

interface PurchaseInvoiceDetailCalculateTotalProps {
  form: UseFormReturn<PurchaseInvoicePayload>;
  index: number;
}

const PurchaseInvoiceDetailCalculateTotal: FC<
  PurchaseInvoiceDetailCalculateTotalProps
> = ({ form, index }) => {
  const field = form.watch(`details.${index}`);
  const total =
    field.price * field.quantity - (field.discount ?? 0) + field.tax;
  const debounceTotal = useDebounce(total, 300);
  return (
    <NumericFormat
      value={debounceTotal}
      {...NUMERIC_PROPS}
      displayType="text"
    />
  );
};

export default PurchaseInvoiceDetailCalculateTotal;
