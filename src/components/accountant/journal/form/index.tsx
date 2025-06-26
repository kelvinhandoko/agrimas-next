"use client";

import { type FORM_TYPE } from "@/constant";
import { type JournalPayload, journalPayloadSchema } from "@/model";
import { paths } from "@/paths/paths";
import { api } from "@/trpc/react";
import { errorFormatter } from "@/utils/formatter/errorFormatter";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { type FC } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

import BackButton from "@/components/BackButton";
import DateInput from "@/components/accountant/journal/form/DateInput";
import TypeInput from "@/components/accountant/journal/form/TypeInput";
import JournalDetailForm from "@/components/accountant/journal/form/detail";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface JournalFormProps {
  type?: FORM_TYPE;
}

const today = new Date();

const JournalForm: FC<JournalFormProps> = ({ type = "CREATE" }) => {
  const utils = api.useUtils();
  const router = useRouter();
  const { mutateAsync: createJournal, isPending } =
    api.journal.create.useMutation();
  const form = useForm<JournalPayload>({
    resolver: zodResolver(journalPayloadSchema),
    defaultValues: {
      date: today,
      type: "GENERAL",
      details: [
        {
          accountId: "",
          debit: 0,
          credit: 0,
        },
        {
          accountId: "",
          debit: 0,
          credit: 0,
        },
      ],
    },
  });

  const onSubmit: SubmitHandler<JournalPayload> = async (data) => {
    toast.promise(
      async () => {
        return await createJournal(data);
      },
      {
        loading: "Loading...",
        success: async () => {
          router.push("/accountant/journal");
          await utils.journal.get.invalidate();
          return "berhasil membuat jurnal umum";
        },
        error: errorFormatter,
      },
    );
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto flex w-[min(95%,1080px)] flex-col gap-4"
        autoComplete="off"
      >
        <Card>
          <CardHeader className="flex flex-row items-center gap-2">
            <BackButton path={paths.accountant.journal} />
            <CardTitle>form jurnal</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 justify-between gap-4 md:grid-cols-2">
            <DateInput form={form} />
            <TypeInput form={form} />
            <FormField
              control={form.control}
              name="ref"
              render={({ field }) => (
                <FormItem className="flex w-fit max-w-48 items-center gap-2">
                  <FormLabel>ref :</FormLabel>
                  <FormControl>
                    <Input placeholder="opsional" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="flex items-center gap-2">
                  <FormLabel>keterangan :</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="opsional"
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
        <JournalDetailForm form={form} isFormLoading={isPending} />
        <Button
          isLoading={isPending}
          disabled={isPending || !form.formState.isDirty}
          type="submit"
          className="ml-auto w-48"
        >
          submit
        </Button>
      </form>
    </Form>
  );
};

export default JournalForm;
