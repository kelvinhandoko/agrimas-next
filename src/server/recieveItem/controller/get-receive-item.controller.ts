import { paginatedReceiveItemQuerySchema } from "@/model/recieve-item.model";
import { companyProcedure } from "@/trpc/trpc";

import { ReceiveItemRepository } from "@/server/recieveItem/receive-item.repository";

export const getReceiveItemController = companyProcedure
  .input(paginatedReceiveItemQuerySchema)
  .query(async ({ ctx, input }) => {
    const receiveItemRepo = new ReceiveItemRepository(ctx.db);
    return await receiveItemRepo.get({
      ...input,
      companyId: ctx.session.user.companyId,
    });
  });
