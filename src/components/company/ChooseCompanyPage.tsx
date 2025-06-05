"use client";

import { type CompanyPayload, companyPayloadSchema } from "@/model";
import { paths } from "@/paths/paths";
import { api } from "@/trpc/react";
import { avatarFormatter } from "@/utils/formatter/AvatarFormatter";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Flex, Grid, Text } from "@radix-ui/themes";
import { TRPCClientError } from "@trpc/client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

const ChooseCompanyPage = () => {
  const utils = api.useUtils();
  const { update } = useSession();
  const { mutateAsync: createCompany } = api.company.create.useMutation();

  const { data: userCompanies, isLoading } =
    api.company.getUserCompanies.useQuery();

  const form = useForm<CompanyPayload>({
    resolver: zodResolver(companyPayloadSchema),
    defaultValues: { name: "", address: "" },
  });

  const onSubmit: SubmitHandler<CompanyPayload> = (data) => {
    toast.promise(
      async () => {
        return createCompany(data);
      },
      {
        loading: "prosessing",
        success: async () => {
          await utils.company.getUserCompanies.invalidate();
          return "berhasil membuat perusahaan baru";
        },
        error: (e) => {
          if (e instanceof TRPCClientError) {
            return e.message;
          }
        },
      },
    );
  };

  const handleSelectCompany = async (companyId: string) => {
    await update({ companyId: companyId });
    return redirect(paths.dataMaster.root);
  };
  return (
    <Grid
      columns={{ initial: "1", md: "2" }}
      maxHeight={"100vh"}
      height={"100vh"}
      className="max-w-full"
      gapX={"2"}
    >
      <Box className="relative hidden items-center justify-center text-white md:flex">
        <div className="absolute bottom-0 left-0 right-0 z-10 h-[70%] bg-gradient-to-t from-black to-transparent opacity-100"></div>
        <Image
          src="https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?q=80&w=1476&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="image login"
          fill
          style={{ objectFit: "cover", zIndex: -1 }}
        />
      </Box>
      <Box className="px-4 py-8">
        <Flex justify={"end"}>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Tambah Perusahaan</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Tambah Perusahaan</DialogTitle>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nama</FormLabel>
                        <FormControl>
                          <Input placeholder="nama perusahaan" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem className="mt-3">
                        <FormLabel>Alamat</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="alamat perusahaan"
                            rows={4}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Flex justify={"end"} className="mt-3 gap-x-3">
                    <DialogTrigger asChild>
                      <Button variant={"outline"}>Batal</Button>
                    </DialogTrigger>
                    <Button type="submit">Tambah</Button>
                  </Flex>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </Flex>
        <Separator className="my-4" />
        <Grid columns={{ initial: "1", sm: "2" }} gap={"4"}>
          {isLoading
            ? "loading...."
            : userCompanies?.map(({ company }, i) => (
                <Card
                  key={i}
                  className="flex cursor-pointer items-center justify-center overflow-hidden p-0"
                  onClick={() => handleSelectCompany(company.id)}
                >
                  <CardHeader className="pt-3">
                    <Avatar className="h-24 w-24">
                      <AvatarFallback className="text-3xl font-bold text-gray-500">
                        {avatarFormatter(company.name)}
                      </AvatarFallback>
                    </Avatar>
                  </CardHeader>
                  <CardFooter className="flex w-full items-center justify-center bg-[#624DE3] py-2 text-white/80">
                    <Text size={"4"} weight={"medium"}>
                      {company.name}
                    </Text>
                  </CardFooter>
                </Card>
              ))}
        </Grid>
      </Box>
    </Grid>
  );
};

export default ChooseCompanyPage;
