"use client";

import { NUMERIC_PROPS } from "@/constant";
import { type PurchasePayload } from "@/model/purchase.model";
import { type FC } from "react";
import { type UseFormReturn } from "react-hook-form";
import { NumericFormat } from "react-number-format";

import { useDebounce } from "@/hooks/use-debounce";

interface PurchaseOrderDetailCalculateTotalProps {
  form: UseFormReturn<PurchasePayload>;
  index: number;
}

const PurchaseOrderDetailCalculateTotal: FC<
  PurchaseOrderDetailCalculateTotalProps
> = ({ form, index }) => {
  const field = form.watch(`detail.${index}`);
  const total =
    (field.price - (field.discount ?? 0)) * field.quantity + field.ppn;
  const debounceTotal = useDebounce(total, 300);
  return (
    <NumericFormat
      value={debounceTotal}
      {...NUMERIC_PROPS}
      displayType="text"
    />
  );
};

export default PurchaseOrderDetailCalculateTotal;
