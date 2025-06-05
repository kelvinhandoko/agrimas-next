import { type PaginatedReceiveItemQuery } from "@/model/recieve-item.model";

import { type ReceiveItemRepository } from "@/server/recieveItem/receive-item.repository";

export const getReceiveItemUseCase =
  (repo: ReceiveItemRepository) => (q: PaginatedReceiveItemQuery) => {
    return repo.get(q);
  };
