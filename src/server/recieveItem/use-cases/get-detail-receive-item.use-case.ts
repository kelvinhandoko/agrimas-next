import { type ReceiveItemRepository } from "@/server/recieveItem/receive-item.repository";

export const getDetailReceiveItemUseCase =
  (repo: ReceiveItemRepository) => (id: string) => {
    return repo.getDetail(id);
  };
