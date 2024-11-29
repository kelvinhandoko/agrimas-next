import { CredentialsSignin } from "next-auth";

export class AuthenticationError extends CredentialsSignin {
  code = "username atau password tidak ditemukan";
}
