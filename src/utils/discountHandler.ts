import { TRPCError } from "@trpc/server";

export const discountHandler = (totalBefore: number, discount: number) => {
  if (totalBefore < 0) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "total sebelum diskon tidak valid",
    });
  }

  if (discount === 0) {
    return 0;
  }

  if (discount < 0) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "diskon tidak valid",
    });
  }

  if (discount <= 100) {
    const discountAmount = (totalBefore * discount) / 100;
    return discountAmount;
  }

  if (discount > totalBefore) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "diskon nominal tidak boleh lebih besar dari total",
    });
  }

  return discount;
};
