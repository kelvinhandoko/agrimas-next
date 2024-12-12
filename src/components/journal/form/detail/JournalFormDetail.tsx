"use client";

import { NUMERIC_PROPS } from "@/constant";
import { type JournalPayload } from "@/model";
import { Trash } from "lucide-react";
import { type FC } from "react";
import { type Control, type FieldArrayWithId } from "react-hook-form";
import { NumericFormat } from "react-number-format";

import AccountInput from "@/components/journal/form/detail/AccountInput";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { TableCell, TableRow } from "@/components/ui/table";

interface JournalFormDetailProps {
  field: FieldArrayWithId<JournalPayload, "details", "uid">;
  remove: () => void;
  index: number;
  control: Control<JournalPayload>;
}

const JournalFormDetail: FC<JournalFormDetailProps> = ({
  remove,
  control,
  index,
}) => {
  return (
    <TableRow>
      <TableCell>{index + 1}</TableCell>
      <TableCell>
        <AccountInput control={control} index={index} />
      </TableCell>
      <TableCell>
        <FormField
          control={control}
          name={`details.${index}.debit`}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <NumericFormat
                  name={field.name}
                  getInputRef={field.ref}
                  value={field.value}
                  onValueChange={({ floatValue }) => field.onChange(floatValue)}
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
          control={control}
          name={`details.${index}.credit`}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <NumericFormat
                  name={field.name}
                  getInputRef={field.ref}
                  value={field.value}
                  onValueChange={({ floatValue }) => field.onChange(floatValue)}
                  {...NUMERIC_PROPS}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </TableCell>
      <TableCell>
        <Button onClick={remove}>
          <Trash />
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default JournalFormDetail;
