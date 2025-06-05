import ProfileLayout from "@/layouts/main/ProfileLayout";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProfileLayout>{children}</ProfileLayout>;
}
