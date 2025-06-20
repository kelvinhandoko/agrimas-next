import { type NumericFormatProps } from "react-number-format";

import { Input } from "@/components/ui/input";

export const LIMIT = 10;

export const DATE_FORMAT = "dd MMM yyyy";

export type FORM_TYPE = "CREATE" | "EDIT";

export const NUMERIC_PROPS: NumericFormatProps = {
  displayType: "input",
  customInput: Input,
  prefix: "Rp. ",
  thousandSeparator: ".",
  allowNegative: false,
  decimalSeparator: ",",
};

export const TIMEZONE = "Asia/Jakarta";

export const PPN = 11;
