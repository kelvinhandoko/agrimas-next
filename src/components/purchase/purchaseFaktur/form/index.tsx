"use client";

import {
  type PurchaseInvoicePayload,
  purchaseInvoicePayloadSchema,
} from "@/model/purchase-invoice";
import { paths } from "@/paths/paths";
import { api } from "@/trpc/react";
import { errorFormatter } from "@/utils/formatter/errorFormatter";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

import BackButton from "@/components/BackButton";
import DateInput from "@/components/purchase/purchaseFaktur/form/DateInput";
import ReceiveItemInput from "@/components/purchase/purchaseFaktur/form/ReceiveItemInput";
import PurchaseInvoiceDetailForm from "@/components/purchase/purchaseFaktur/form/detail";
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

const PurchaseInvoiceForm = () => {
  const utils = api.useUtils();
  const router = useRouter();
  const form = useForm<PurchaseInvoicePayload>({
    resolver: zodResolver(purchaseInvoicePayloadSchema),
    defaultValues: {
      date: today,
      receiveItemId: "",
    },
  });

  const { mutateAsync: createPurchaseInvoice, isPending } =
    api.purchaseInvoice.create.useMutation();

  const onSubmit: SubmitHandler<PurchaseInvoicePayload> = async (data) => {
    toast.promise(
      async () => {
        return await createPurchaseInvoice(data);
      },
      {
        loading: "sedang membuat faktur pembelian...",
        success: async () => {
          router.replace(paths.purchase.purchaseReceived.root);
          // await utils.purchaseInvoice..invalidate();
          return "berhasil membuat faktur pembelian";
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
          <BackButton path={paths.purchase.purchaseFaktur.root} />
          <CardTitle>form faktur pembelian</CardTitle>
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
          <ReceiveItemInput form={form} />
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
        <PurchaseInvoiceDetailForm isFormLoading={isPending} form={form} />
      </form>
    </Form>
  );
};

export default PurchaseInvoiceForm;
