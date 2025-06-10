"use client";

import { type AuthPayload, authPayloadSchema } from "@/model/auth.model";
import { paths } from "@/paths/paths";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Callout,
  Flex,
  Grid,
  Quote,
  Spinner,
  Text,
} from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

import PasswordInput from "@/components/common/input/PasswordInput";

import { handleCredentialsSignIn } from "./authAction";

const SignInPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AuthPayload>({
    resolver: zodResolver(authPayloadSchema),
  });

  const [credentialErr, setCredentialErr] = useState<string | null>(null);

  const onSubmit = async (data: AuthPayload) => {
    const { username, password } = data;
    try {
      const result = await handleCredentialsSignIn({ username, password });
      setCredentialErr(result?.message ?? "");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <Grid
      columns={{ initial: "1", md: "2" }}
      maxHeight={"100vh"}
      height={"100vh"}
    >
      <Flex direction={"column"} justify={"center"} align={"center"}>
        <Box className="w-[60%]">
          <Flex align={"start"} className="mb-3 w-full">
            <Text size={"6"} weight={"medium"}>
              Login
            </Text>
          </Flex>
          {credentialErr && (
            <Callout.Root color="red" role="alert" my={"2"}>
              <Callout.Text>Login Failed | Invalid Credential</Callout.Text>
            </Callout.Root>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-2.5 box-border grid">
              <div className="flex items-baseline justify-between">
                <label
                  htmlFor="username"
                  className="text-[15px] font-medium leading-[35px] text-gray-600"
                >
                  Username
                </label>
              </div>
              <input
                id="username"
                {...register("username")}
                className="bg-blackA2 shadow-blackA6 selection:bg-blackA6 text-gray box-border inline-flex h-[35px] w-full appearance-none items-center justify-center rounded px-2.5 text-[15px] leading-none shadow-[0_0_0_1px] outline-none selection:text-white hover:shadow-[0_0_0_1px_black] focus:border-[#624DE3] focus:shadow-[0_0_0_2px_#624DE3]"
                type="text"
              />
              {errors.username && (
                <span className="mt-2 text-red-500">
                  {errors.username.message!}
                </span>
              )}{" "}
            </div>

            <div className="mb-2.5 grid">
              <PasswordInput {...register("password")} />
              {errors.password && (
                <span className="mt-2 text-red-500">
                  {errors.password.message!}
                </span>
              )}{" "}
            </div>

            <Flex align={"end"} justify={"end"} className="mb-3 w-full">
              <Text className="text-[#624DE3]">
                <Link href={paths.auth.forgotPassword}>Forgot Password?</Link>
              </Text>
            </Flex>

            <Button
              type="submit"
              className={`my-3 w-full ${!isSubmitting && "cursor-pointer bg-[#624DE3]"}`}
              size="3"
              variant="solid"
              disabled={isSubmitting}
            >
              <Spinner loading={isSubmitting}></Spinner>
              Sign In
            </Button>
          </form>
        </Box>
      </Flex>
      <Box className="relative hidden items-center justify-center text-white md:flex">
        <div className="absolute bottom-0 left-0 right-0 z-10 h-[70%] bg-gradient-to-t from-black to-transparent opacity-100"></div>
        <Image
          src="https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?q=80&w=1476&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="image login"
          fill
          style={{ objectFit: "cover", zIndex: -1 }}
        />
        <Box className="absolute bottom-1/4 left-0 right-0 z-20 text-center text-white">
          <Text className="text-wite" size={"6"}>
            <Quote className="not-italic">
              Setiap usaha adalah langkah kecil <br /> menuju impian besar.
            </Quote>
          </Text>
        </Box>
      </Box>
    </Grid>
  );
};

export default SignInPage;
