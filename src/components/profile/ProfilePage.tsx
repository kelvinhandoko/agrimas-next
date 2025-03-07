"use client";

import { api } from "@/trpc/react";
import { Flex, Spinner } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

const ProfilePage = () => {
  const { data } = useSession();
  console.log(data);
  const utils = api.useUtils();

  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<any>({
    // resolver: zodResolver(supplierPayloadSchema),
    defaultValues: {
      nama: data?.user.username ?? "",
      role: data?.user.role ?? "",
    },
  });

  const { mutateAsync: createSupplier } = api.supplier.create.useMutation();

  const onSubmit: SubmitHandler<any> = async (data) => {
    setIsLoading(true);
    try {
      toast.promise(
        async () => {
          // return createSupplier(data);
        },
        {
          loading: "Memproses...",
          success: async () => {
            await utils.supplier.getAll.invalidate();
            setIsLoading(false);
            form.reset();
            return "Berhasil update profile";
          },
          error: (error) => {
            setIsLoading(false);
            if (error instanceof Error) {
              return error.message;
            }
            return "Terjadi kesalahan";
          },
        },
      );
    } catch (error) {
      console.error("Login error:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (data?.user) {
      form.reset({
        nama: data.user.username ?? "",
        role: data.user.role ?? "",
      });
    }
  }, [data?.user]);

  const detectChangeInput = form.watch("nama") === data?.user.username!;
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="nama"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="nama supplier" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem className="mt-4">
              <FormLabel>Role</FormLabel>
              <FormControl>
                <Input readOnly placeholder="role supplier" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Flex justify={"end"} className="mt-3 gap-x-3">
          <Button type="submit" disabled={isLoading || detectChangeInput}>
            <Spinner loading={isLoading} />
            Update
          </Button>
        </Flex>
      </form>
    </Form>
  );
};

export default ProfilePage;
