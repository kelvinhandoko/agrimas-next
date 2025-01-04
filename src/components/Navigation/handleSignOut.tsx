"use server";

import { signOut } from "@/server/services";

export async function handleSignOut() {
  await signOut();
}
