import React from "react";

import { Navigation } from "@/components/Navigation/Navigation";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full max-w-full">
      <Navigation />
      <main className="max-w-full px-4 py-8">{children}</main>
    </div>
  );
};

export default MainLayout;
