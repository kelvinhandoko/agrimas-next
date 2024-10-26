import { createTRPCRouter, protectedProcedure } from "@/trpc/trpc";

export const userRouter = createTRPCRouter({
  create: protectedProcedure.query(() => {
    return { id: 1, username: "test" };
  }),
});
