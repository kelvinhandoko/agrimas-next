import { accountPayloadSchema } from "@/server/account/account.model";
import { CreateAccountController } from "@/server/account/controller";
import { companyProcedure, createTRPCRouter } from "@/trpc/trpc";

export const accountRouter = createTRPCRouter({
  create: companyProcedure
    .input(accountPayloadSchema.omit({ companyId: true }))
    .mutation(async ({ input, ctx }) => {
      const createAccountController = new CreateAccountController();
      return createAccountController.execute({
        ...input,
        companyId: ctx.session.user.companyId,
      });
    }),
});
