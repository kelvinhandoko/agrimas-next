"use client";

import { paths } from "@/paths/paths";
import { formatPrice } from "@/utils/format-price";
import { Box, Grid, Text } from "@radix-ui/themes";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

import { cn } from "@/lib/utils";

import BackButton from "@/components/BackButton";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";

import JournalRow from "./JournalRow";

const NewJournalPage = () => {
  const defaultValues = {
    ref: "",
    date: "",
    note: "",
    detail: [
      {
        accountId: "",
        debit: 0,
        credit: 0,
      },
    ],
  };
  const form = useForm<any>({
    defaultValues,
  });

  const { control, setValue } = form;

  const onSubmit: SubmitHandler<any> = async (data) => {
    try {
      toast.success("success tambah jurnal", {
        position: "top-right",
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box>
      <Box className="mb-8">
        <BackButton path={paths.accountant.root} />
      </Box>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Box>
            <Grid columns={{ initial: "1", md: "2" }}>
              <FormField
                control={form.control}
                name="ref"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>No Jurnal</FormLabel>
                    <FormControl>
                      <Input placeholder="no jurnal (opsional)" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Grid>
            <Grid columns={{ initial: "1", md: "2" }} className="mt-3">
              {/* Tanggal */}
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Tanggal</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent
                        className="mb-4 h-full w-full overflow-auto"
                        align="start"
                      >
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          className="flex h-full w-full"
                          classNames={{
                            months:
                              "flex w-full flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 flex-1",
                            month: "space-y-4 w-full flex flex-col",
                            table: "w-full h-full border-collapse space-y-1",
                            head_row: "",
                            row: "w-full mt-2",
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Grid>
            <Grid columns={{ initial: "1", md: "2" }} className="mt-3">
              <FormField
                control={form.control}
                name="note"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deskripsi</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="deskripsi...."
                        rows={4}
                        {...field}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Grid>
          </Box>
          <hr className="my-7" />
          <JournalRow control={control} setValue={setValue} />
          <hr className="my-7" />
          <Box className="mt-4 flex items-center justify-end gap-10">
            <Text>Total Debit: {formatPrice(1000000)}</Text>
            <Text>Total Credit: {formatPrice(1000000)}</Text>
          </Box>
          <Box className="mt-4 flex items-center justify-end gap-2">
            <Button
              type="submit"
              variant={"destructiveOnline"}
              className="mt-4"
            >
              Batal
            </Button>
            <Button type="submit" className="mt-4">
              Simpan
            </Button>
          </Box>
        </form>
      </Form>
    </Box>
  );
};

export default NewJournalPage;
