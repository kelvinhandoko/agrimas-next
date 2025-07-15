import { NUMERIC_PROPS } from "@/constant";
import { type PaymentMethodPayload } from "@/model/payment-method.model";
import { api } from "@/trpc/react";
import { errorFormatter } from "@/utils/formatter/errorFormatter";
import React, { type FC } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface PaymentMethodFormProps {
  onClose: () => void;
}

const PaymentMethodForm: FC<PaymentMethodFormProps> = ({ onClose }) => {
  const utils = api.useUtils();
  const { mutateAsync: createPaymentMethod, isPending } =
    api.paymentMethod.create.useMutation();
  // const { mutateAsync: updatePaymentMethod } =
  //   api.paymentMethod.update.useMutation();

  const form = useForm<PaymentMethodPayload>({
    defaultValues: { initialAmount: 0, name: "", accountNumber: "" },
  });

  const onSubmit: SubmitHandler<PaymentMethodPayload> = async (data) => {
    toast.promise(
      async () => {
        return await createPaymentMethod(data);
      },
      {
        loading: "loading...",
        success: async () => {
          form.reset();
          await utils.paymentMethod.get.invalidate();
          onClose();
          return "berhasil membuat metode pembayaran";
        },
        error: errorFormatter,
      },
    );
  };
  return (
    <Form {...form}>
      <form
        autoComplete="off"
        className="space-y-4"
        onSubmit={async (e) => {
          e.stopPropagation();
          e.preventDefault();
          await form.handleSubmit(onSubmit)(e);
        }}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama</FormLabel>
              <FormControl>
                <Input placeholder="masukan nama metode" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="accountNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>no rekening</FormLabel>
              <FormControl>
                <Input
                  placeholder="opsional"
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="initialAmount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>saldo awal</FormLabel>
              <FormControl>
                <NumericFormat
                  placeholder="masukan saldo awal"
                  value={field.value === 0 ? "" : field.value}
                  onValueChange={({ floatValue }) => {
                    field.onChange(floatValue);
                  }}
                  {...NUMERIC_PROPS}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          isLoading={isPending}
          className="w-full"
          disabled={isPending || !form.formState.isDirty}
        >
          submit
        </Button>
      </form>
    </Form>
  );
};

export default PaymentMethodForm;
