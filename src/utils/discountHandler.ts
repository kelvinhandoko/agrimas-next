import { TRPCError } from "@trpc/server";

export const discountHandler = (totalBefore: number, discount: number) => {
  console.log(discount);
  if (discount === 0) {
    return 0;
  }

  if (discount < 0 || discount > 100) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "diskon tidak valid",
    });
  }

  const discountAmount = (totalBefore * discount) / 100;

  return discountAmount;
};
