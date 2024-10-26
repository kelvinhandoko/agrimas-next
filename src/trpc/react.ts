import { AppRouter } from "@/trpc/root";
import { createTRPCReact } from "@trpc/react-query";

export const api = createTRPCReact<AppRouter>();
