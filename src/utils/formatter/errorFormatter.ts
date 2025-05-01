import { TRPCClientError } from "@trpc/client";
import { TRPCError } from "@trpc/server";
import { type TRPC_ERROR_CODE_KEY } from "@trpc/server/unstable-core-do-not-import";

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

export const serverErrorFormatter = (
  code: TRPC_ERROR_CODE_KEY,
  message: string,
) => {
  throw new TRPCError({
    code,
    message,
  });
};
