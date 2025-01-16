import { type UserPayload } from "@/model";
import { hashPassword } from "@/utils/passwordHandler";
import { vi } from "vitest";

vi.mock("next/headers", () => {
  return {
    headers: vi.fn(() => ({})),
  };
});

const password = await hashPassword("password");

export const mockUser: UserPayload = {
  password,
  role: "USER",
  username: "user",
};

export const mockAdmin: UserPayload = {
  password,
  role: "USER",
  username: "admin",
};

export const mockOwner: UserPayload = {
  password,
  role: "OWNER",
  username: "owner",
};
