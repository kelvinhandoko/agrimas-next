"use client";

import {
  type SalesInvoicePayload,
  salesInvoicePayloadSchema,
} from "@/model/sales-invoice.model";
import { api } from "@/trpc/react";
import { errorFormatter } from "@/utils/formatter/errorFormatter";
import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

import BackButton from "@/components/BackButton";
import DateInput from "@/components/sale/saleFaktur/form/DateInput";
import SalesInput from "@/components/sale/saleFaktur/form/SalesInput";
import { CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const today = new Date();

const SalesInvoiceForm = () => {
  const utils = api.useUtils();
  const form = useForm<SalesInvoicePayload>({
    resolver: zodResolver(salesInvoicePayloadSchema),
    defaultValues: {
      date: today,
      customerId: "",
      salesPersonId: "",
      details: [],
    },
  });

  const { mutateAsync: createSalesInvoice, isPending } =
    api.salesInvoice.create.useMutation();

  const onSubmit: SubmitHandler<SalesInvoicePayload> = async (data) => {
    toast.promise(
      async () => {
        return await createSalesInvoice(data);
      },
      {
        loading: "sedang membuat faktur penjualan",
        success: async () => {
          await utils.salesInvoice.get.invalidate();
          return "berhasil membuat faktur penjualan";
        },
        error: errorFormatter,
      },
    );
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
        autoComplete="off"
      >
        <div className="flex items-center gap-2">
          <BackButton path="/sale/sale-faktur" />
          <CardTitle>form faktur penjualan</CardTitle>
        </div>
        <div className="grid-col-1 grid w-1/2 items-center gap-2 md:grid-cols-3">
          <DateInput form={form} />
          <FormField
            control={form.control}
            name="ref"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ref</FormLabel>
                <FormControl>
                  <Input
                    className="w-64"
                    placeholder="ref (optional)"
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <SalesInput form={form} />
          <SalesInput form={form} />
        </div>
      </form>
    </Form>
  );
};

export default SalesInvoiceForm;
