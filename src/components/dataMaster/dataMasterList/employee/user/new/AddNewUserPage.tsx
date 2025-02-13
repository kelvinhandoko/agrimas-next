"use client";

import { type UserPayload, userPayloadSchema } from "@/model";
import { paths } from "@/paths/paths";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Role } from "@prisma/client";
import { Box, Flex, Grid, Spinner } from "@radix-ui/themes";
import Link from "next/link";
import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

import BackButton from "@/components/BackButton";
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

const AddNewUserPage = () => {
  const utils = api.useUtils();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<UserPayload>({
    resolver: zodResolver(userPayloadSchema),
    defaultValues: {
      username: "",
      password: "",
      role: Role.USER,
    },
  });

  const { mutateAsync: createUser } = api.user.create.useMutation();

  const onSubmit: SubmitHandler<UserPayload> = async (data) => {
    setIsLoading(true);
    try {
      toast.promise(async () => createUser(data), {
        loading: "Memproses...",
        success: async () => {
          // await utils.user.getAll.invalidate();

          setIsLoading(false);
          form.reset();
          return "Berhasil tambah user";
        },
        error: (error) => {
          setIsLoading(false);
          if (error instanceof Error) {
            return error.message;
          }
          return "Terjadi kesalahan";
        },
      });
    } catch (error) {
      console.error("error:", error);
      setIsLoading(false);
    }
  };
  return (
    <Box>
      <Box className="mb-8">
        <BackButton path={paths.dataMaster.employee.root} />
      </Box>
      <Grid
        columns={{ initial: "1", md: "2" }}
        maxHeight={"100vh"}
        height={"100vh"}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="mb-3">
                  <FormLabel>User Name</FormLabel>
                  <FormControl>
                    <Input placeholder="username user" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="mb-3">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="password user"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className="mb-3">
                  <FormLabel>Role</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih role user" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.values(Role).map((role, index) => (
                        <SelectItem key={role} value={role}>
                          {role}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Flex justify={"end"} className="mt-3 gap-x-3">
              <Link href={paths.dataMaster.employee.root}>
                <Button variant={"destructiveOnline"}>Batal</Button>
              </Link>
              <Button type="submit" disabled={isLoading}>
                <Spinner loading={isLoading} />
                Tambah
              </Button>
            </Flex>
          </form>
        </Form>
      </Grid>
    </Box>
  );
};

export default AddNewUserPage;
