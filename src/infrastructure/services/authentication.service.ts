import { authConfig } from "@/config/auth.config";
import { AuthenticationError } from "@/entities/errors/auth";
import { db } from "@/infrastructure/prisma/prisma";

import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { verifyPassword } from "@/utils/passwordHandler";
import { UserRepository } from "@/infrastructure/repositories/user.repository";

export const { auth, handlers, signOut, signIn } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        username: { label: "Username" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials) return null;
        const username = credentials?.username as string;
        const password = credentials?.password as string;

        const userRepo = new UserRepository(db);

        const user = await userRepo.findUserByUsername(username);

        if (!user) {
          throw new AuthenticationError();
        }

        const checkPass = await verifyPassword(password, user.password);

        if (!checkPass) {
          throw new AuthenticationError();
        }

        return user;
      },
    }),
  ],
});
