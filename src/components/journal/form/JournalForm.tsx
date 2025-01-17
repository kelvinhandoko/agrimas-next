"use client";

import { DATE_FORMAT, NUMERIC_PROPS } from "@/constant";
import { type JournalPayload, journalPayloadSchema } from "@/model";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { TRPCClientError } from "@trpc/client";
import { CalendarIcon, Plus } from "lucide-react";
import { DateTime } from "luxon";
import { useRouter } from "next/navigation";
import { type SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { toast } from "sonner";

import { cn } from "@/lib/utils";

import JournalFormDetail from "@/components/journal/form/detail/JournalFormDetail";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import {
  Form,
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const JournalForm = () => {
  // hooks
  const utils = api.useUtils();
  const router = useRouter();

  // apis
  const { mutateAsync: createJournal } = api.journal.create.useMutation();

  // form
  const form = useForm<JournalPayload>({
    resolver: zodResolver(journalPayloadSchema),
    defaultValues: { details: [], type: "GENERAL" },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "details",
    keyName: "uid",
  });

  const totalDebit = form
    .watch("details")
    .reduce((acc, curr) => acc + curr.debit, 0);

  const totalCredit = form
    .watch("details")
    .reduce((acc, curr) => acc + curr.credit, 0);

  const onSubmit: SubmitHandler<JournalPayload> = (data) => {
    toast.promise(
      async () => {
        return await createJournal(data);
      },
      {
        loading: "prosessing",
        success: async () => {
          router.replace("/journal");
          await utils.journal.getAll.invalidate();
          return "berhasil membuat jurnal baru";
        },
        error: (e) => {
          if (e instanceof TRPCClientError) {
            return e.message;
          }
        },
      },
    );
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Card>
          <CardContent>
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>tanggal</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? (
                            DateTime.fromJSDate(field.value).toFormat(
                              DATE_FORMAT,
                            )
                          ) : (
                            <span>Pick a date</span>
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
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>no</TableHead>
                  <TableHead>nama akun</TableHead>
                  <TableHead>debit</TableHead>
                  <TableHead>kredit</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {fields.map((field, index) => (
                  <JournalFormDetail
                    field={field}
                    control={form.control}
                    index={index}
                    remove={() => remove(index)}
                    key={index}
                  />
                ))}

                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    <Button
                      className="w-full"
                      variant="outline"
                      onClick={() =>
                        append({
                          accountId: "",
                          credit: 0,
                          debit: 0,
                        })
                      }
                    >
                      <Plus />
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <Card className="w-36">
              <CardHeader>total debit:</CardHeader>
              <CardDescription>
                <NumericFormat
                  value={totalDebit}
                  {...NUMERIC_PROPS}
                  displayType="text"
                />
              </CardDescription>
            </Card>
            <Card className="w-36">
              <CardHeader>total kredit:</CardHeader>
              <CardDescription>
                <NumericFormat
                  value={totalCredit}
                  {...NUMERIC_PROPS}
                  displayType="text"
                />
              </CardDescription>
            </Card>
          </div>
          <Button type="submit">submit</Button>
        </div>
      </form>
    </Form>
  );
};

export default JournalForm;
