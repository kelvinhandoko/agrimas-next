// tests/router.test.ts
import { db } from "@/server";
import { createCaller } from "@/trpc/root";
import { headers } from "next/headers";
import { describe, expect, it } from "vitest";

describe("tRPC router tests", async () => {
  const header = await headers();
  const caller = createCaller({
    db: db,
    session: {
      user: {
        companyId: "1",
        role: "OWNER",
        username: "adde",
        id: "12309asd",
      },
    },
    headers: header,
  });
  it("should return a greeting message", async () => {
    const result = await caller.supplier.create({
      alamat: "jalan raya",
      nama: "nama",
      id: "1",
    });
    expect(result).toBe("Hello, Kelvin!");
  });
});
