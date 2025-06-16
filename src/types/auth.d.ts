import { type Role } from "@prisma/client";
import "next-auth/jwt";

declare module "next-auth" {
  interface User {
    companyId: string | null;
    role: Role;
    username: string;
  }

  interface Session {
    user: {
      id: string;
      role: Role;
      username: string;
      companyId: string | null;
    };
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    role: Role;
    username: string;
    companyId: string | null;
    id?: string;
  }
}
