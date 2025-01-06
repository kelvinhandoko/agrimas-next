"use client";

import { paths } from "@/paths/paths";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Callout, Flex, Text } from "@radix-ui/themes";
import { ArrowLeftIcon, InfoIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export default function ForgotPassword() {
  const formSchema = z.object({
    email: z.string().min(1, {
      message: "Email required",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <Box className="h-screen max-h-screen">
      <Flex justify={"center"} align={"center"} className="h-full">
        <Box className="w-[40%]">
          <Flex
            direction={"column"}
            justify={"center"}
            align={"center"}
            className="mb-3 h-full"
            gap={"2"}
          >
            <Text weight={"medium"} size={"5"}>
              Forgot Password?
            </Text>
            <Text size={"3"} color="gray">
              No worries, we'll send your reset instruction
            </Text>
          </Flex>
          <Callout.Root color="green" role="alert" my={"2"}>
            <Callout.Icon>
              <InfoIcon size={"12px"} />
            </Callout.Icon>
            <Callout.Text>Check your email</Callout.Text>
          </Callout.Root>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="user@gmail.com"
                        className="bg-blackA2 shadow-blackA6 selection:bg-blackA6 text-gray box-border inline-flex h-[35px] w-full appearance-none items-center justify-center rounded px-2.5 text-[15px] leading-none shadow-[0_0_0_1px] outline-0 selection:text-white hover:shadow-[0_0_0_1px_black] focus:border-[#624DE3] focus:shadow-[0_0_0_2px_#624DE3] focus:outline-0"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="my-3 w-full cursor-pointer bg-[#624DE3]"
                size="3"
              >
                Reset Password
              </Button>
            </form>
          </Form>
          <Flex align={"end"} justify={"end"} className="my-3 w-full">
            <Link
              href={paths.auth.signIn}
              className="flex items-center gap-x-1 text-[#624DE3]"
            >
              <ArrowLeftIcon />
              <Text>Back to sign in</Text>
            </Link>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
