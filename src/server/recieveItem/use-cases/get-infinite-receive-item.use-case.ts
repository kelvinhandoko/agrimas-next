import { type CursoredReceiveItemQuery } from "@/model/recieve-item.model";

import { type ReceiveItemRepository } from "@/server/recieveItem/receive-item.repository";

export const getInfiniteReceiveItemUseCase =
  (repo: ReceiveItemRepository) => (q: CursoredReceiveItemQuery) => {
    return repo.getInfinite(q);
  };
