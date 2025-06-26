"use client";

import { type JournalPayload } from "@/model";
import { convertType } from "@/utils/journalTypeHelper";
import { JournalType } from "@prisma/client";
import { type FC } from "react";
import { type UseFormReturn } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TypeInputProps {
  form: UseFormReturn<JournalPayload>;
}

const TypeInput: FC<TypeInputProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="type"
      render={({ field }) => (
        <FormItem className="flex items-center gap-2">
          <FormLabel>tipe jurnal :</FormLabel>
          <Select onValueChange={field.onChange} value={field.value}>
            <FormControl>
              <SelectTrigger className="w-fit min-w-64 capitalize">
                <SelectValue placeholder="pilih tipe jurnal" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {Object.keys(JournalType).map((key) => (
                <SelectItem key={key} value={key}>
                  {convertType(key as JournalType).toLowerCase()}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default TypeInput;
