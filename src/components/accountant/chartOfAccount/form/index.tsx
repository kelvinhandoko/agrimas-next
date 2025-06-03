"use client";

import { type FORM_TYPE } from "@/constant";
import { type AccountPayload, accountPayloadSchema } from "@/model";
import { api } from "@/trpc/react";
import { errorFormatter } from "@/utils/formatter/errorFormatter";
import { zodResolver } from "@hookform/resolvers/zod";
import { Laporan, NormalPosition } from "@prisma/client";
import { camelCase } from "lodash";
import { type FC } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

import GroupAccountInput from "@/components/accountant/chartOfAccount/form/GroupAccountInput";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";

interface AccountFormProps {
  type?: FORM_TYPE;
  onClose: (id?: string) => void;
}

const AccountForm: FC<AccountFormProps> = ({ type = "CREATE", onClose }) => {
  const utils = api.useUtils();
  const form = useForm<AccountPayload>({
    resolver: zodResolver(accountPayloadSchema),
    defaultValues: {
      name: "",
      posisi: "DEBIT",
      groupAccountId: "",
      reports: [],
    },
  });

  const { mutateAsync: createAccount } = api.account.create.useMutation();
  const { mutateAsync: updateAccount } = api.account.update.useMutation();

  const onSubmit: SubmitHandler<AccountPayload> = async (data) => {
    toast.promise(
      async () => {
        if (type === "CREATE") {
          return await createAccount(data);
        } else {
          return await updateAccount({
            id: data.id,
            ...data,
          });
        }
      },
      {
        loading: "sedang memproses",
        success: async (data) => {
          form.reset();
          onClose(data.id);
          await utils.account.get.invalidate();

          return `berhasil membuat akun baru`;
        },
        error: errorFormatter,
      },
    );
  };

  return (
    <Form {...form}>
      <form
        autoComplete="off"
        onSubmit={async (e) => {
          e.preventDefault();
          e.stopPropagation();
          await form.handleSubmit(onSubmit)();
        }}
        className="space-y-8"
      >
        <GroupAccountInput form={form} />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>nama akun</FormLabel>
              <FormControl>
                <Input placeholder="masukan nama akun" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col items-center justify-between space-x-2 md:flex-row">
          <FormField
            control={form.control}
            name="posisi"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>posisi saldo normal</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex"
                  >
                    {Object.values(NormalPosition).map((pos) => (
                      <FormItem
                        key={pos}
                        className="flex items-center space-x-3 space-y-0"
                      >
                        <FormControl>
                          <RadioGroupItem value={pos} />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {pos.toLowerCase()}
                        </FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Separator orientation="vertical" className="h-16" />
          <FormField
            control={form.control}
            name="reports"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-base">laporan</FormLabel>
                </div>
                <div className="flex w-fit gap-4">
                  {Object.values(Laporan).map((report) => (
                    <FormField
                      key={report}
                      control={form.control}
                      name="reports"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={report}
                            className="flex items-center gap-2"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(report)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, report])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== report,
                                        ),
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="m-0 font-normal">
                              {camelCase(report)}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">simpan</Button>
      </form>
    </Form>
  );
};

export default AccountForm;
