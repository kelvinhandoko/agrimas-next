"use client";
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
import { type AccountPayload } from "@/server/account";
import { api } from "@/trpc/react";
import { TRPCClientError } from "@trpc/client";
import { type FC } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

interface AccountFormProps {
  onClose: () => void;
}

const AccountForm: FC<AccountFormProps> = ({ onClose }) => {
  //apis
  const { mutateAsync: createAccount } = api.account.create.useMutation();

  // form
  const form = useForm<AccountPayload>();

  // function
  const onSubmit: SubmitHandler<AccountPayload> = (data) => {
    toast.promise(
      async () => {
        return await createAccount(data);
      },
      {
        loading: "prosessing",
        success: () => {
          onClose();
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
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default AccountForm;
