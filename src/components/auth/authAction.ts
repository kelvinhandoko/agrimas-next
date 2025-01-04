"use server";

import { paths } from "@/paths/paths";
import { AuthError } from "next-auth";

import { signIn } from "@/server/services";

export async function handleCredentialsSignIn({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  try {
    await signIn("credentials", {
      username,
      password,
      redirectTo: paths.redirectTo,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            message: "Invalid credentials",
          };
        default:
          return {
            message: "Something went wrong.",
          };
      }
    }
    throw error;
  }
}
