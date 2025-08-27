"use client";

// Import luxon
import { DATE_FORMAT, TIMEZONE } from "@/constant";
import { predefinedRanges } from "@/utils/dateHelper";
import { CalendarIcon } from "lucide-react";
import { DateTime } from "luxon";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { type FC, useState } from "react";
import { type DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface IProps {
  label?: string;
}

const DateRangePicker: FC<IProps> = ({ label }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [date, setDate] = useState<DateRange | undefined>({
    from: predefinedRanges.thisMonth.from.toJSDate(), // Convert Luxon DateTime to JS Date
    to: predefinedRanges.thisMonth.to.toJSDate(),
  });

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const updateSearchParams = (newFrom: DateTime, newTo: DateTime) => {
    const params = new URLSearchParams(searchParams);

    const formattedFrom = newFrom.toISO()!;
    const formattedTo = newTo.toISO()!;

    // Set the formatted dates in the search params
    params.set("from", formattedFrom);
    params.set("to", formattedTo);

    // Replace the URL with updated parameters
    router.replace(`${pathname}?${params.toString()}`);
  };

  const handleRangeSelect = (rangeKey: keyof typeof predefinedRanges) => {
    const selectedRange = predefinedRanges[rangeKey];
    setDate({
      from: selectedRange.from.toJSDate(),
      to: selectedRange.to.toJSDate(),
    });
    updateSearchParams(selectedRange.from, selectedRange.to);
    setIsPopoverOpen(false); // Close the popover when a range is selected
  };

  const handleCalendarSelect = (range: DateRange | undefined) => {
    if (!range?.from || !range.to) {
      setDate(range);
      return;
    }

    const fromDate = DateTime.fromJSDate(range.from, { zone: TIMEZONE });
    const toDate = DateTime.fromJSDate(range.to, { zone: TIMEZONE });

    if (fromDate <= toDate) {
      setDate(range);
      updateSearchParams(fromDate, toDate);
    } else {
      setDate({ from: range.to, to: range.from });
      updateSearchParams(toDate, fromDate);
    }
  };

  return (
    <div className={cn("flex flex-col gap-2")}>
      <Label>pilih tanggal</Label>
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            suppressHydrationWarning
            className={cn(
              "w-full justify-end text-left font-normal",
              !date && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {DateTime.fromJSDate(date.from, { zone: TIMEZONE }).toFormat(
                    DATE_FORMAT,
                  )}{" "}
                  -{" "}
                  {DateTime.fromJSDate(date.to, { zone: TIMEZONE }).toFormat(
                    DATE_FORMAT,
                  )}
                </>
              ) : (
                DateTime.fromJSDate(date.from).toFormat(DATE_FORMAT)
              )
            ) : (
              <span>{label ?? "Pilih Tanggal"}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-3" align="start">
          <Select
            onValueChange={(value) =>
              handleRangeSelect(value as keyof typeof predefinedRanges)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Pilih Rentang" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="today">Hari Ini</SelectItem>
              <SelectItem value="thisWeek">Minggu Ini</SelectItem>
              <SelectItem value="thisMonth">Bulan Ini</SelectItem>
              <SelectItem value="lastMonth">Bulan lalu</SelectItem>
            </SelectContent>
          </Select>
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleCalendarSelect}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DateRangePicker;
