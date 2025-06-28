"use client";

import { paths } from "@/paths/paths";
import { Box } from "@radix-ui/themes";
import { usePathname } from "next/navigation";
import { type ReactNode, useEffect, useState } from "react";

import BackButton from "@/components/BackButton";
import ListItem from "@/components/Navigation/ListItem";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";

const profileMenuItems = [
  {
    title: "Your Profile",
    path: paths.profile.root,
  },
  {
    title: "Change Password",
    path: paths.profile.changePassword,
  },
];
const ProfileLayout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const [activePath, setActivePath] = useState("");

  useEffect(() => {
    setActivePath(pathname);
  }, [pathname]);
  return (
    <>
      <Box className="mb-8">
        <BackButton path={paths.dataMaster.root} />
      </Box>

      <Box className="flex w-full flex-col gap-3 md:w-1/2 md:flex-row">
        <Card className="flex w-full items-center md:w-1/2">
          <Avatar className="h-[80px] w-[80px]">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Box className="hidden w-full md:block">
            {profileMenuItems.map((value, index) => (
              <ListItem
                key={index}
                isActive={value.path === activePath}
                path={value.path}
                title={value.title}
                className="mb-2 w-full"
              />
            ))}
            {/* <ListItem
          isActive={false}
          path={paths.profile.changePassword}
          title="Change Password"
          className="w-full"
        /> */}
          </Box>
        </Card>
        <Card className="w-full">{children}</Card>
      </Box>
    </>
  );
};

export default ProfileLayout;
