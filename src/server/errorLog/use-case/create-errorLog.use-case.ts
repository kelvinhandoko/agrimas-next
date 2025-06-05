import { type ErrorLogPayload } from "@/model/errorLog.model";

import { type ErrorLogRepository } from "@/server/errorLog/errorLog.repository";

export const createErrorLogUseCase =
  (errorLogRepo: ErrorLogRepository) => async (payload: ErrorLogPayload) => {
    return await errorLogRepo.createLog(payload);
  };
