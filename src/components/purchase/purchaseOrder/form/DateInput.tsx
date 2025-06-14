"use client";

import { DATE_FORMAT } from "@/constant";
import { type PurchasePayload } from "@/model/purchase.model";
import { CalendarIcon } from "lucide-react";
import { DateTime } from "luxon";
import { type FC } from "react";
import { type UseFormReturn } from "react-hook-form";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DateInputProps {
  form: UseFormReturn<PurchasePayload>;
}

const DateInput: FC<DateInputProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="purchaseDate"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>tanggal permintaan</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-64 pl-3 text-left font-normal",
                    !field.value && "text-muted-foreground",
                  )}
                >
                  {field.value ? (
                    DateTime.fromJSDate(field.value).toFormat(DATE_FORMAT)
                  ) : (
                    <span>pilih tanggal</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                disabled={(date) =>
                  date > new Date() || date < new Date("1900-01-01")
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default DateInput;
