import { chooseCompanyPayloadSchema } from "@/entities/models/user";
import { UserRepository } from "@/infrastructure/repositories/user.repository";
import {
  auth,
  signIn,
  unstable_update,
} from "@/infrastructure/services/authentication.service";
import { createTRPCRouter, protectedProcedure } from "@/trpc/trpc";

export const userRouter = createTRPCRouter({
  create: protectedProcedure.query(({ ctx, input }) => {
    return { id: 1, username: "test" };
  }),
});
