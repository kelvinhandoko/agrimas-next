"use client";

import {
  type ReceiveItemPayload,
  recieveItemPayloadSchema,
} from "@/model/recieve-item.model";
import { paths } from "@/paths/paths";
import { api } from "@/trpc/react";
import { errorFormatter } from "@/utils/formatter/errorFormatter";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

import BackButton from "@/components/BackButton";
import DateInput from "@/components/purchase/purchaseReceived/form/DateInput";
import PurchaseOrderInput from "@/components/purchase/purchaseReceived/form/PurchaseOrderInput";
import PurchaseReceiveDetailForm from "@/components/purchase/purchaseReceived/form/detail";
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

const PurchaseReceivedForm = () => {
  const utils = api.useUtils();
  const router = useRouter();
  const form = useForm<ReceiveItemPayload>({
    resolver: zodResolver(recieveItemPayloadSchema),
    defaultValues: {
      receiveDate: today,
      purchaseId: "",
    },
  });

  const { mutateAsync: createReceiveItem, isPending } =
    api.receiveItem.create.useMutation();

  const onSubmit: SubmitHandler<ReceiveItemPayload> = async (data) => {
    toast.promise(
      async () => {
        return await createReceiveItem(data);
      },
      {
        loading: "sedang membuat Surat Penerimaan Barang...",
        success: async () => {
          router.replace(paths.purchase.purchaseReceived.root);
          await utils.receiveItem.get.invalidate();
          return "berhasil membuat Surat penerimaan Barang";
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
          <BackButton path={paths.purchase.purchaseReceived.root} />
          <CardTitle>form penerimaan Pembelian</CardTitle>
        </div>
        <div className="grid w-full grid-cols-1 items-start gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <DateInput form={form} />
          <FormField
            control={form.control}
            name="ref"
            render={({ field }) => (
              <FormItem>
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
          <PurchaseOrderInput form={form} />
          <FormField
            control={form.control}
            name="note"
            render={({ field }) => (
              <FormItem className="sm:col-span-2 lg:col-span-3">
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
        <PurchaseReceiveDetailForm isFormLoading={isPending} form={form} />
      </form>
    </Form>
  );
};

export default PurchaseReceivedForm;
