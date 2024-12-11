import UpdateButton from "@/components/testButton";
import { auth, signOut } from "@/server/services/authentication.service";
import { HydrateClient } from "@/trpc/server";

export default async function Home() {
  const session = await auth();
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
        <UpdateButton newCompany={"1"} />
        <p>{session?.user.companyId}</p>
      </main>
    </HydrateClient>
  );
}
