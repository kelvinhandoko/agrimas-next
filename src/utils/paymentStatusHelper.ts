import { type TRANSACTION_PAYMENT_STATUS } from "@prisma/client";
import { TRPCError } from "@trpc/server";

export const paymentStatusHelper = (
  totalAmount: number,
  totalPaid: number,
): TRANSACTION_PAYMENT_STATUS => {
  if (totalPaid > totalAmount) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "total pembayaran melebihi tagihan yang tersedia",
    });
  }
  if (totalPaid === 0) {
    return "UNPAID";
  }
  if (totalPaid === totalAmount) {
    return "PAID";
  }
  return "PARTIAL";
};
