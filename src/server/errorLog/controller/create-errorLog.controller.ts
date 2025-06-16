import { errorLogPayloadSchema } from "@/model/errorLog.model";
import { publicProcedure } from "@/trpc/trpc";

import { ErrorLogRepository } from "@/server/errorLog/errorLog.repository";
import { createErrorLogUseCase } from "@/server/errorLog/use-case/create-errorLog.use-case";

export const createErrorLogController = publicProcedure
  .input(errorLogPayloadSchema)
  .mutation(async ({ ctx, input }) => {
    const errorLogRepo = new ErrorLogRepository(ctx.db);
    const createErrorLog = createErrorLogUseCase(errorLogRepo);
    return await createErrorLog({
      ...input,
      userId: ctx.session.user?.id,
      companyId: ctx.session.user?.companyId,
    });
  });
