"use client";

import { api } from "@/trpc/react";
import { Flex, Spinner } from "@radix-ui/themes";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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

const ChangePasswordPage = () => {
  const utils = api.useUtils();

  const [isLoading, setIsLoading] = useState(false);
  const [sendEmailVerication, setSendEmailVerification] = useState(false);
  const form = useForm<any>({
    // resolver: zodResolver(supplierPayloadSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
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
            setIsLoading(false);
            form.reset();
            setSendEmailVerification(true);
            return "Check your email";
          },
          error: (error) => {
            setIsLoading(false);
            setSendEmailVerification(false);
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
      setSendEmailVerification(false);
    }
  };
  return (
    <>
      {sendEmailVerication && (
        <Alert variant={"success"}>
          <AlertTitle>Check your email for verification</AlertTitle>
        </Alert>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="current password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem className="mt-4">
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="new password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmNewPassword"
            render={({ field }) => (
              <FormItem className="mt-4">
                <FormLabel>Confirm New Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="confirm new password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Flex justify={"end"} className="mt-3 gap-x-3">
            <Button type="submit" disabled={isLoading}>
              <Spinner loading={isLoading} />
              Update
            </Button>
          </Flex>
        </form>
      </Form>
    </>
  );
};

export default ChangePasswordPage;
