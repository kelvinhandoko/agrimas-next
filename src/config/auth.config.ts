/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { db } from "@/server/db/prisma";
import { GetUserByIdController } from "@/server/user/controller/get-user-by-id.controller";
import { UserRepository } from "@/server/user/user.repository";
import { type NextAuthConfig } from "next-auth";

export const authConfig = {
  callbacks: {
    authorized: async ({ auth }) => {
      const userRepo = new UserRepository(db);
      const getUserController = new GetUserByIdController(userRepo);
      if (!auth?.user.id) return false;
      const user = await getUserController.execute(auth.user.id);
      return !!user;
    },

    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          role: token.role,
          username: token.username,
          companyId: token.companyId,
        },
      };
    },
    jwt: ({ token, user, trigger, session }) => {
      if (user) {
        return {
          ...token,
          id: user.id,
          role: user.role,
          companyId: user.companyId,
          username: user.username,
        };
      }
      if (trigger === "update") {
        token.companyId = session.companyId; // Update token with companyId
      }
      return token;
    },
  },

  providers: [],
} satisfies NextAuthConfig;
