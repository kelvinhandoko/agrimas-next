"use client";

import {
  type PurchaseReturnPayload,
  purchaseReturnPayloadSchema,
} from "@/model/purchase-return.model";
import { paths } from "@/paths/paths";
import { api } from "@/trpc/react";
import { errorFormatter } from "@/utils/formatter/errorFormatter";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

import BackButton from "@/components/BackButton";
import DateInput from "@/components/purchase/purchaseReturn/form/DateInput";
import SupplierInput from "@/components/purchase/purchaseReturn/form/SupplierInput";
import PurchaseReturnDetailForm from "@/components/purchase/purchaseReturn/form/detail";
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

const PurchaseReturnForm = () => {
  const utils = api.useUtils();
  const router = useRouter();
  const form = useForm<PurchaseReturnPayload>({
    resolver: zodResolver(purchaseReturnPayloadSchema),
    defaultValues: {
      date: today,
      supplierId: "",
    },
  });

  const { mutateAsync: createPurchaseReturn, isPending } =
    api.purchaseReturn.create.useMutation();

  const onSubmit: SubmitHandler<PurchaseReturnPayload> = async (data) => {
    toast.promise(
      async () => {
        return await createPurchaseReturn(data);
      },
      {
        loading: "sedang membuat retur pembelian",
        success: async () => {
          form.reset();
          router.replace(paths.purchase.purchaseReturn.root);
          await utils.purchase.getAll.invalidate();
          return "berhasil membuat retur pembelian";
        },
        error: errorFormatter,
      },
    );
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="container mx-auto space-y-4"
        autoComplete="off"
      >
        <div className="flex items-center gap-2">
          <BackButton path="/sale/sale-faktur" />
          <CardTitle>form retur pembelian</CardTitle>
        </div>
        <div className="grid w-full grid-cols-1 items-start gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:w-3/4">
          <DateInput form={form} />

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
        <PurchaseReturnDetailForm isFormLoading={isPending} form={form} />
      </form>
    </Form>
  );
};

export default PurchaseReturnForm;
