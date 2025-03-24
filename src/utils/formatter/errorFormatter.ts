import { TRPCClientError } from "@trpc/client";
import { TRPCError } from "@trpc/server";

export const errorFormatter = (e: unknown) => {
  if (e instanceof TRPCClientError || e instanceof TRPCError) {
    if (e.message.length > 40) {
      return "server error";
    }
    return e.message;
  } else {
    return "Terjadi kesalahan";
  }
};
