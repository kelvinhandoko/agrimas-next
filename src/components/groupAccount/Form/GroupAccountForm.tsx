"use client";

import { type GroupAccountPayload, groupAccountPayloadSchema } from "@/model";
import { api } from "@/trpc/react";
import { convertAccountClass } from "@/utils/accountClassHelper";
import { zodResolver } from "@hookform/resolvers/zod";
import { AccountClass } from "@prisma/client";
import { TRPCClientError } from "@trpc/client";
import { type FC, useEffect } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface GroupAccountFormProps {
  onClose: () => void;
  data?: Partial<GroupAccountPayload>;
}

const GroupAccountForm: FC<GroupAccountFormProps> = ({ onClose, data }) => {
  // apis
  const { mutateAsync: createGroupAccount } =
    api.groupAccount.create.useMutation();

  // form
  const form = useForm<GroupAccountPayload>({
    resolver: zodResolver(groupAccountPayloadSchema),
    defaultValues: {
      name: "",
      accountClass: "ASSET",
    },
  });

  const onSubmit: SubmitHandler<GroupAccountPayload> = (data) => {
    toast.promise(
      async () => {
        return await createGroupAccount(data);
      },
      {
        loading: "prosessing",
        success: () => {
          onClose();
          return "berhasil membuat kelompok akun baru";
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
        <FormField
          control={form.control}
          name="accountClass"
          render={({ field }) => (
            <FormItem>
              <FormLabel>kelas akun</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="pilih kelas akun" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(AccountClass).map((accountClass) => (
                    <SelectItem value={accountClass} key={accountClass}>
                      {convertAccountClass(accountClass)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>nama kelompok akun</FormLabel>
              <FormControl>
                <Input placeholder="masukan nama kelompok akun" {...field} />
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

export default GroupAccountForm;
