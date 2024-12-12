/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type NextAuthConfig } from "next-auth";

import { db } from "@/server/db/prisma";
import { GetUserByIdUseCase } from "@/server/user/use-cases";
import { UserRepository } from "@/server/user/user.repository";

export const authConfig = {
  callbacks: {
    authorized: async ({ auth }) => {
      const userRepo = new UserRepository(db);
      const getUserUseCase = new GetUserByIdUseCase(userRepo);
      if (!auth?.user.id) return false;
      const user = await getUserUseCase.execute(auth.user.id);
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
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        token.companyId = session.companyId;
      }

      return token;
    },
  },

  providers: [],
} satisfies NextAuthConfig;
