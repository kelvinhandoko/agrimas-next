"use client";

import { paths } from "@/paths/paths";
import { Text } from "@radix-ui/themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { HiOutlineMenuAlt3 } from "react-icons/hi";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import ListItem from "./ListItem";
import { handleSignOut } from "./handleSignOut";

type MenuItem = {
  title: string;
  path: string;
  subPaths?: string[]; // optional property since not all menu items have subPaths
};

type NavigationMobileProps = {
  menuItems: MenuItem[];
};

const NavigationMobile = ({ menuItems }: NavigationMobileProps) => {
  const pathname = usePathname();
  const [activePath, setActivePath] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleMenuClick = () => {
    setIsDrawerOpen(false);
  };
  useEffect(() => {
    setActivePath(pathname);
  }, [pathname]);
  return (
    <Drawer
      direction="right"
      open={isDrawerOpen}
      onOpenChange={setIsDrawerOpen}
    >
      <DrawerTrigger>
        <HiOutlineMenuAlt3 size={"30px"} />
      </DrawerTrigger>
      <DrawerContent className="h-screen" isShowIndicator={false}>
        <DrawerHeader>
          <DrawerTitle>
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="text-left">
                <Text size={"6"} className="text-sm">
                  Name employee
                </Text>
                <div className="mt-1">
                  <Text className="text-sm text-muted-foreground">
                    email@gmail.com
                  </Text>
                </div>
              </div>
            </div>
          </DrawerTitle>
          <div className="mt-6 text-left">
            <nav className="mt-2">
              <div className="text-sm font-semibold">Account</div>
              <ul>
                <li onClick={handleMenuClick}>
                  <ListItem
                    title="Profile"
                    path={paths.profile.root}
                    isActive={activePath === paths.profile.root}
                  />
                </li>
              </ul>
              <div className="mt-4 text-sm font-semibold">Menu</div>
              <ul className="w-full space-y-1">
                {menuItems.map((item) => (
                  <li key={item.title} onClick={handleMenuClick}>
                    <ListItem
                      title={item.title}
                      path={item.path}
                      isActive={
                        item.subPaths
                          ? item.subPaths.some((subPath) =>
                              activePath.startsWith(subPath),
                            ) || activePath.startsWith(item.path)
                          : activePath === item.path
                      }
                    />
                  </li>
                ))}
              </ul>
              <hr className="my-3" />
              <form action={handleSignOut}>
                <button
                  type="submit"
                  className="text-red-500 hover:text-red-700"
                >
                  Log Out
                </button>
              </form>
            </nav>
          </div>
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose>close</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default NavigationMobile;
