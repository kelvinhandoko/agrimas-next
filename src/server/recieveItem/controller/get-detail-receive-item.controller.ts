import { companyProcedure } from "@/trpc/trpc";
import { z } from "zod";

import { ReceiveItemRepository } from "@/server/recieveItem/receive-item.repository";
import { getDetailReceiveItemUseCase } from "@/server/recieveItem/use-cases/get-detail-receive-item.use-case";

export const getDetailReceiveItemController = companyProcedure
  .input(z.string())
  .query(async ({ ctx, input }) => {
    const receiveItemRepo = new ReceiveItemRepository(ctx.db);
    return await getDetailReceiveItemUseCase(receiveItemRepo)(input);
  });
