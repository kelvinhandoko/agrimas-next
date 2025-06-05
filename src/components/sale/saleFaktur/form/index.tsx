"use client";

import {
  type SalesInvoicePayload,
  salesInvoicePayloadSchema,
} from "@/model/sales-invoice.model";
import { paths } from "@/paths/paths";
import { api } from "@/trpc/react";
import { errorFormatter } from "@/utils/formatter/errorFormatter";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

import BackButton from "@/components/BackButton";
import CustomereInput from "@/components/sale/saleFaktur/form/CustomerInput";
import DateInput from "@/components/sale/saleFaktur/form/DateInput";
import SalesInput from "@/components/sale/saleFaktur/form/SalesInput";
import SalesInvoiceDetailForm from "@/components/sale/saleFaktur/form/detail";
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
import { Textarea } from "@/components/ui/textarea";

const today = new Date();

const SalesInvoiceForm = () => {
  const utils = api.useUtils();
  const router = useRouter();
  const form = useForm<SalesInvoicePayload>({
    resolver: zodResolver(salesInvoicePayloadSchema),
    defaultValues: {
      date: today,
      customerId: "",
      salesPersonId: "",
      discount: 0,
      tax: 0,
      details: [
        {
          productId: "",
          discount: 0,
          price: 0,
          quantity: 1,
          tax: 0,
        },
      ],
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
          router.replace(paths.sale.saleFaktur.root);
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
        <div className="grid-col-1 grid w-2/3 items-center gap-2 md:grid-cols-3">
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
          <CustomereInput form={form} />
          <FormField
            control={form.control}
            name="note"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>catatan</FormLabel>
                <FormControl>
                  <Textarea
                    className="w-full"
                    placeholder="catatan (optional)"
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <SalesInvoiceDetailForm isFormLoading={isPending} form={form} />
      </form>
    </Form>
  );
};

export default SalesInvoiceForm;
