import UpdateButton from "@/components/testButton";
import { auth, signOut } from "@/server/services/authentication.service";
import { api, HydrateClient } from "@/trpc/server";

export default async function Home() {
  await api.user.create();
  const session = await auth();

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <button type="submit">Sign Out</button>
        </form>
        <UpdateButton newCompany={"1"} />
        <p>{session?.user.username}</p>
      </main>
    </HydrateClient>
  );
}
