import React from "react";

import { cn } from "@/lib/utils";

import { jakartaSans } from "@/styles/font";

import { Navigation } from "@/components/Navigation/Navigation";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen w-full max-w-full flex-col">
      <Navigation />
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
