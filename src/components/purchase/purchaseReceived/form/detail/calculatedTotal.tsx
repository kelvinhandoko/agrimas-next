"use client";

import { NUMERIC_PROPS } from "@/constant";
import { type ReceiveItemPayload } from "@/model/recieve-item.model";
import { type FC } from "react";
import { type UseFormReturn } from "react-hook-form";
import { NumericFormat } from "react-number-format";

import { useDebounce } from "@/hooks/use-debounce";

interface PurchaseReceivedDetailCalculateTotalProps {
  form: UseFormReturn<ReceiveItemPayload>;
  index: number;
}

const PurchaseReceivedDetailCalculateTotal: FC<
  PurchaseReceivedDetailCalculateTotalProps
> = ({ form, index }) => {
  const field = form.watch(`details.${index}`);
  const total =
    (field.price - (field.discount ?? 0)) * field.quantity + field.tax;
  const debounceTotal = useDebounce(total, 300);
  return (
    <NumericFormat
      value={debounceTotal}
      {...NUMERIC_PROPS}
      displayType="text"
    />
  );
};

export default PurchaseReceivedDetailCalculateTotal;
