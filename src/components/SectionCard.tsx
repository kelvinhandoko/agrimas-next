"use client";

// components/ui/section-card.tsx
import { m } from "motion/react";
import Link from "next/link";
import React, { type ReactNode } from "react";

import { cn } from "@/lib/utils";

import { CardSlideAnimation } from "@/components/motion/variant";

interface SectionCardProps {
  menu: { title: string; icon: ReactNode; path: string };
  className?: string;
  index: number;
}

const SectionCard: React.FC<SectionCardProps> = ({
  menu,
  className,
  index,
}) => {
  const { title, icon, path } = menu;
  return (
    <Link href={path} className="block">
      <m.div
        animate="visible"
        initial="hidden"
        variants={CardSlideAnimation}
        custom={index % 20}
        className={cn(
          "group relative aspect-[2/1] overflow-hidden rounded-2xl border border-border bg-card",
          "cursor-pointer shadow-lg transition-all duration-300 ease-out hover:shadow-xl",
          "hover:scale-[1.02] hover:border-primary/30 active:scale-[0.98]",
          className,
        )}
      >
        {/* Background gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="relative z-10 flex h-full w-full flex-col items-center justify-center">
          {/* Icon Container */}
          <div
            className={cn(
              "flex-shrink-0 rounded-xl p-3 transition-all duration-300",
            )}
          >
            {icon}
          </div>

          {/* Title */}
          <h3 className="text-md text-center font-semibold text-foreground transition-colors duration-300 group-hover:text-primary">
            {title}
          </h3>
        </div>

        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 h-1 origin-left scale-x-0 transform bg-gradient-to-r from-primary to-primary/80 transition-transform duration-300 group-hover:scale-x-100" />
      </m.div>
    </Link>
  );
};

export default SectionCard;
