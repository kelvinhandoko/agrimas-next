import { vi } from "vitest";

vi.mock("next/headers", () => {
  return {
    headers: vi.fn(() => ({})),
  };
});
