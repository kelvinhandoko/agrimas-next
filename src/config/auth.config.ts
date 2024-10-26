/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type NextAuthConfig } from "next-auth";

export const authConfig = {
  callbacks: {
    authorized: ({ auth }) => {
      return !!auth?.user;
    },
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          role: token.role,
          username: token.username,
        },
      };
    },
    jwt: ({ token, user }) => {
      if (user) {
        return {
          ...token,
          id: user.id,
          role: user.role,
          username: user.username,
        };
      }
      return token;
    },
  },

  providers: [],
} satisfies NextAuthConfig;
