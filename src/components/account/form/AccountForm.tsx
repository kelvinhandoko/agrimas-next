"use client";

import { type AccountPayload } from "@/model";
import { api } from "@/trpc/react";
import { Laporan, NormalPosition } from "@prisma/client";
import { TRPCClientError } from "@trpc/client";
import { camelCase } from "lodash";
import { type FC, useEffect } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

import GroupAccountInput from "@/components/account/form/GroupAccountInput";
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

interface AccountFormProps {
  onClose: () => void;
  data?: Partial<AccountPayload>;
}

const AccountForm: FC<AccountFormProps> = ({ onClose, data }) => {
  // hooks
  const utils = api.useUtils();

  //apis
  const { mutateAsync: createAccount } = api.account.create.useMutation();

  // form
  const form = useForm<AccountPayload>({
    // resolver: zodResolver(accountPayloadSchema.omit({companyId:true})),
    defaultValues: {
      name: "",
      posisi: "DEBIT",
      report: [],
    },
  });

  // function
  const onSubmit: SubmitHandler<AccountPayload> = (data) => {
    toast.promise(
      async () => {
        return await createAccount(data);
      },
      {
        loading: "prosessing",
        success: async () => {
          onClose();
          await utils.account.getAll.invalidate();
          return "berhasil membuat akun baru";
        },
        error: (e) => {
          if (e instanceof TRPCClientError) {
            return e.message;
          }
        },
      },
    );
  };

  useEffect(() => {
    if (data) {
      form.reset(data);
    }
  }, [data]);

  return (
    <Form {...form}>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          e.stopPropagation();
          await form.handleSubmit(onSubmit)(e);
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
        <FormField
          control={form.control}
          name="report"
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
                    name="report"
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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default AccountForm;
