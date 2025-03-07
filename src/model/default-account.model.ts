import { TRANSACTION_CATEGORY } from "@prisma/client";
import { z } from "zod";

import { type WithCompany } from "@/server/common";

export const defaultAccountPayloadSchema = z.object({
  accountId: z.string().describe("account id of the default account"),
  category: z
    .nativeEnum(TRANSACTION_CATEGORY, {
      invalid_type_error: "kategori tidak valid",
    })
    .describe("category of the default account"),
});

export type DefaultAccountPayload = z.infer<
  typeof defaultAccountPayloadSchema
> &
  WithCompany;
