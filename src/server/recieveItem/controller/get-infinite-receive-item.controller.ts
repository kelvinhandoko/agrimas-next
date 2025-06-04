import { cursoredReceiveItemQuerySchema } from "@/model/recieve-item.model";
import { companyProcedure } from "@/trpc/trpc";

import { ReceiveItemRepository } from "@/server/recieveItem/receive-item.repository";

export const getInfiniteReceiveItemController = companyProcedure
  .input(cursoredReceiveItemQuerySchema)
  .query(async ({ ctx, input }) => {
    const receiveItemRepo = new ReceiveItemRepository(ctx.db);
    return await receiveItemRepo.getInfinite({
      ...input,
      companyId: ctx.session.user.companyId,
    });
  });
