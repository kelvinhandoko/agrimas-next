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
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Form } from "@/components/ui/form";

interface JournalFormProps {
  type?: FORM_TYPE;
}

const today = new Date();

const JournalForm: FC<JournalFormProps> = ({ type = "CREATE" }) => {
  const utils = api.useUtils();
  const router = useRouter();
  const { mutateAsync: createJournal } = api.journal.create.useMutation();
  const form = useForm<JournalPayload>({
    resolver: zodResolver(journalPayloadSchema),
    defaultValues: {
      date: today,
    },
  });

  const onSubmit: SubmitHandler<JournalPayload> = async (data) => {
    toast.promise(
      async () => {
        await createJournal(data);
      },
      {
        loading: "Loading...",
        success: async () => {
          router.push("/accountant/journal");
          await utils.journal.getAll.invalidate();
          return "berhasil membuat jurnal umum";
        },
        error: errorFormatter,
      },
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} autoComplete="off">
        <Card>
          <CardHeader>
            <BackButton path={paths.accountant.journal} />
          </CardHeader>
          <CardContent>
            <DateInput form={form} />
          </CardContent>
        </Card>
      </form>
    </Form>
  );
};

export default JournalForm;
