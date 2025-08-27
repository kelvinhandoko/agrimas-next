import React from "react";

import { cn } from "@/lib/utils";

import { jakartaSans } from "@/styles/font";

import { NavigationV2 } from "../../components/Navigation/NavigationV2";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full max-w-full">
      <NavigationV2 />
      <main
        className={cn(
          "flex max-w-full flex-1 flex-col px-4 py-8 capitalize",
          jakartaSans.className,
        )}
      >
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
