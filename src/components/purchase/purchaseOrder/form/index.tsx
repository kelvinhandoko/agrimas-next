"use client";

import {
  type PurchasePayload,
  purchasePayloadSchema,
} from "@/model/purchase.model";
import { paths } from "@/paths/paths";
import { api } from "@/trpc/react";
import { errorFormatter } from "@/utils/formatter/errorFormatter";
import { zodResolver } from "@hookform/resolvers/zod";
import { DateTime } from "luxon";
import { useRouter } from "next/navigation";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

import BackButton from "@/components/BackButton";
import DateInput from "@/components/purchase/purchaseOrder/form/DateInput";
import DueDateInput from "@/components/purchase/purchaseOrder/form/DueDateInput";
import SupplierInput from "@/components/purchase/purchaseOrder/form/SupplierInput";
import PurchaseOrderDetailForm from "@/components/purchase/purchaseOrder/form/detail";
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

const PurchaseOrderForm = () => {
  const utils = api.useUtils();
  const router = useRouter();
  const form = useForm<PurchasePayload>({
    resolver: zodResolver(purchasePayloadSchema),
    defaultValues: {
      purchaseDate: today,
      dueDate: DateTime.fromJSDate(today).plus({ day: 30 }).toJSDate(),
      discount: 0,
      ppn: 0,
      supplierId: "",
    },
  });

  const { mutateAsync: createPurchaseOrder, isPending } =
    api.purchase.create.useMutation();

  const onSubmit: SubmitHandler<PurchasePayload> = async (data) => {
    toast.promise(
      async () => {
        return await createPurchaseOrder(data);
      },
      {
        loading: "sedang membuat permintaan pembelian",
        success: async () => {
          router.replace(paths.purchase.purchaseOrder.root);
          await utils.purchase.getAll.invalidate();
          return "berhasil membuat permintaan pembelian";
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
          <CardTitle>form pesanan pembelian</CardTitle>
        </div>
        <div className="grid w-full grid-cols-1 items-start gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:w-3/4">
          <DateInput form={form} />

          <DueDateInput form={form} />

          <FormField
            control={form.control}
            name="ref"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>ref</FormLabel>
                <FormControl>
                  <Input
                    className="w-full"
                    placeholder="ref (optional)"
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <SupplierInput form={form} />

          <FormField
            control={form.control}
            name="note"
            render={({ field }) => (
              <FormItem className="sm:col-span-2">
                <FormLabel>catatan</FormLabel>
                <FormControl>
                  <Textarea
                    className="min-h-[100px] w-full"
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
        <PurchaseOrderDetailForm isFormLoading={isPending} form={form} />
      </form>
    </Form>
  );
};

export default PurchaseOrderForm;
