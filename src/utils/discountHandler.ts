import { TRPCError } from "@trpc/server";

export const discountHandler = (totalBefore: number, discount: number) => {
  if (discount === 0 || discount > 100) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "diskon tidak valid",
    });
  }
  const discountAmount = (totalBefore * discount) / 100;
  return discountAmount;
};
