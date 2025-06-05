import React from "react";

import { cn } from "@/lib/utils";

import { jakartaSans } from "@/styles/font";

import { Navigation } from "@/components/Navigation/Navigation";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full max-w-full">
      <Navigation />
      <main className={cn("max-w-full px-4 py-8", jakartaSans.className)}>
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
