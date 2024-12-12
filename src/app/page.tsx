import { HydrateClient } from "@/trpc/server";

import { signOut } from "@/server/services";

export default async function Home() {
  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <button type="submit">Sign Out</button>
        </form>
      </main>
    </HydrateClient>
  );
}
