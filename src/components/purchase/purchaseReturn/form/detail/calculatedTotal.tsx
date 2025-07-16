"use client";

import { NUMERIC_PROPS } from "@/constant";
import { type PurchaseReturnPayload } from "@/model/purchase-return.model";
import { type FC } from "react";
import { type UseFormReturn } from "react-hook-form";
import { NumericFormat } from "react-number-format";

import { useDebounce } from "@/hooks/use-debounce";

interface PurchaseReturnDetailCalculateTotalProps {
  form: UseFormReturn<PurchaseReturnPayload>;
  index: number;
}

const PurchaseReturnDetailCalculateTotal: FC<
  PurchaseReturnDetailCalculateTotalProps
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

export default PurchaseReturnDetailCalculateTotal;
